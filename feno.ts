import fs from 'fs';
import { rendering, themes } from './feno.json';

type PreRenderedAtoms = Record<string, string>;
type PreRenderedElements = Record<string, string>;

const preRenderAtoms = () => {
  const collection: Record<string, string> = {};
  themes.forEach(({ prefix, tokens }) => {
    // FONTS

    // families
    collection[`${prefix}_ff_a`] = `font-family: ${tokens.fonts.a}`;
    collection[`${prefix}_ff_b`] = `font-family: ${tokens.fonts.b}`;
    collection[`${prefix}_ff_c`] = `font-family: ${tokens.fonts.c}`;

    // colors
    Object.entries(tokens.colors).forEach(([k, v]) => {
      collection[`${prefix}_fc_${k}`] = `color: ${v}`;
    });

    // BG

    // colors
    Object.entries(tokens.colors).forEach(([k, v]) => {
      collection[`${prefix}_bgc_${k}`] = `background-color: ${v}`;
    });
  });
  return collection;
};

const preRenderElements = () => {
  const collection: Record<string, string> = {};
  collection.button = themes.map((t) => `${t.elements.button}`).join(' ');
  return collection;
};

const renderAtoms = (preRenderedAtoms: PreRenderedAtoms) => {
  return Object.entries(preRenderedAtoms)
    .map(([k, v]) => `.${k.split('_')[0]} .${k} { ${v}; }`)
    .join('\n');
};

const renderKitchenSink = (
  styles: string = '',
  preRenderedElements: PreRenderedElements
) => {
  return `<html>
  <head>
    <style>${styles}</style>
  </head>
  <body class="${themes[0].prefix}">
  ${themes
    .map(
      (theme) => ` <button
      class="${preRenderedElements.button}"
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
const styles = [renderAtoms(preRenderedAtoms)].join('\n');
fs.writeFileSync(rendering.outfile, styles, 'utf-8');
fs.writeFileSync(
  'index.html',
  renderKitchenSink(styles, preRenderedElements),
  'utf-8'
);
