import fs from 'fs';
import { rendering, themes } from './feno.json';

type PreRenderedAtoms = Record<string, string>;
type PreRenderedElements = Record<string, string>;

const preRenderAtoms = () => {
  const collection: Record<string, string> = {};
  themes.forEach(({ tokens }) => {
    // families
    Object.entries(tokens.fonts).forEach(
      ([k]) => (collection[`ff_${k}`] = `font-family: var(--${k})`)
    );

    // colors
    Object.entries(tokens.colors).forEach(
      ([k]) => (collection[`fc_${k}`] = `color: var(--${k})`)
    );

    // colors
    Object.entries(tokens.colors).forEach(
      ([k]) => (collection[`bgc_${k}`] = `background-color: var(--${k})`)
    );

    // columns
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(
      (v) => (collection[`gc_${v}`] = `grid-template-columns:repeat(${v},1fr)`)
    );
    collection[`gr_auto`] = `grid-template-rows:auto`;
  });
  return collection;
};

const preRenderElements = () => {
  const collection: Record<string, string> = {};
  collection.button = themes.map((t) => `${t.elements.button}`).join(' ');
  return collection;
};

const renderTokens = () => {
  return themes
    .map(({ prefix, tokens }) => {
      const colors = `.${prefix} {\n${Object.entries(tokens.colors)
        .map(([k, v]) => `--${k}: ${v};`)
        .join('\n')}\n}`;
      return colors;
    })
    .join('\n');
};

const renderAtoms = (preRenderedAtoms: PreRenderedAtoms) => {
  return Object.entries(preRenderedAtoms)
    .map(([k, v]) => `.${k.split('_')[0]} { ${v}; }`)
    .join('\n');
};

const renderKitchenSink = (
  styles: string = '',
  preRenderedElements: PreRenderedElements
) => {
  return `<html>
  <head>
    <style>
${styles}
    </style>
  </head>
  <body class="${themes[0].prefix}">
  ${themes
    .map(
      (theme) => ` <button
      class="${preRenderedElements.button}"
      style="cursor:pointer"
      onclick="document.body.className='${theme.prefix}'"
    >
      ${theme.prefix}
    </button>`
    )
    .join('\n')}
   
  </body>
</html>`;
};

const preRenderedAtoms = preRenderAtoms();
const preRenderedElements = preRenderElements();
const tokens = renderTokens();
console.log(preRenderedAtoms);
const atoms = renderAtoms(preRenderedAtoms);
const styles = [tokens, atoms].join('\n');
fs.writeFileSync(rendering.outfile, styles, 'utf-8');
fs.writeFileSync(
  'index.html',
  renderKitchenSink(styles, preRenderedElements),
  'utf-8'
);
