import fs from 'fs';
import { rendering, themes } from './feno.json';

const preRenderAtoms = () => {
  return themes.reduce((acc, { prefix, tokens }) => {
    const collection: Record<string, string> = {};

    // FONTS

    // families
    collection[`ff_a`] = `font-family: ${tokens.fonts.a}`;
    collection[`ff_b`] = `font-family: ${tokens.fonts.b}`;
    collection[`ff_c`] = `font-family: ${tokens.fonts.c}`;

    // colors
    Object.entries(tokens.colors).forEach(([k, v]) => {
      collection['fc_' + k] = `color: ${v}`;
    });

    // BG

    // colors
    Object.entries(tokens.colors).forEach(([k, v]) => {
      collection['bgc_' + k] = `background-color: ${v}`;
    });

    acc[prefix] = collection;
    return acc;
  }, {} as Record<string, Record<string, string>>);
};

const renderAtoms = (
  preRenderedAtoms: Record<string, Record<string, string>>
) => {
  return Object.entries(preRenderedAtoms)
    .map(([theme, atoms]) =>
      Object.entries(atoms)
        .map(([k, v]) => `.${theme} .${theme}_${k} { ${v} }`)
        .join('\n')
    )
    .join('\n');
};

const renderKitchenSink = (styles: string) => {
  const themeButtons = themes
    .map(
      (theme) => `<button
      class="lgt_bgc_black lgt_fc_white lgt_ff_a"
      onclick="document.body.className='${theme.prefix}'"
    >
      ${theme.prefix}
    </button>`
    )
    .join('');

  return `<html>
  <head>
    <style>${styles}</style>
  </head>
  <body class="${themes[0].prefix}">
  ${themeButtons}
  </body>
</html>`;
};

const preRenderedAtoms = preRenderAtoms();
const styles = [renderAtoms(preRenderedAtoms)].join('\n');
fs.writeFileSync(rendering.outfile, styles, 'utf-8');
fs.writeFileSync('index.html', renderKitchenSink(styles), 'utf-8');
