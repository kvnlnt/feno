import fs from 'fs';
import { outfile, themes } from './feno.json';

const renderTokens = () => {
  return themes
    .map(({ prefix, tokens }) => {
      const colors = `.${prefix} {\n${Object.entries(tokens.colors)
        .map(([k, v]) => `   --${k}: ${v};`)
        .join('\n')}\n}`;
      return colors;
    })
    .join('\n');
};

const renderAtoms = () => {
  return themes
    .map(({ prefix, tokens }) => {
      // Fonts
      const font_families = [
        `.${prefix} .${prefix}_ff_a { font-family: ${tokens.fonts.a}; }`,
        `.${prefix} .${prefix}_ff_b { font-family: ${tokens.fonts.b}; }`,
        `.${prefix} .${prefix}_ff_c { font-family: ${tokens.fonts.c}; }`,
      ].join('\n');
      const font_colors = Object.entries(tokens.colors)
        .map(([k]) => `.${prefix} .${prefix}_fc_${k} { color: var(--${k}); }`)
        .join('\n');

      // Backgrounds
      const bg_colors = Object.entries(tokens.colors)
        .map(
          ([k, v]) =>
            `.${prefix} .${prefix}_bgc_${k} { background-color: var(--${k}); }`
        )
        .join('\n');
      return [
        '\n/* font */',
        font_families,
        font_colors,
        '\n/* bg */',
        bg_colors,
      ].join('\n');
    })
    .join('\n');
};

const renderKitchenSink = () => {
  const themeButtons = themes
    .map(
      (theme) => `<button
      class="a_bgc_black a_fc_white a_ff_a b_bgc_grey b_fc_black b_ff_a"
      onclick="document.body.className='${theme.prefix}'"
    >
      ${theme.prefix}
    </button>`
    )
    .join('');

  return `<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
    <script>
      function setTheme(theme) {
        document.body.className = theme;
      }
    </script>
  </head>
  <body class="${themes[0].prefix}">
  ${themeButtons}
  </body>
</html>`;
};

const styles = [renderTokens(), renderAtoms()].join('\n');
fs.writeFileSync(outfile, styles, 'utf-8');
fs.writeFileSync('index.html', renderKitchenSink(), 'utf-8');
