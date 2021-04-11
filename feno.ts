import fs from 'fs';
import { rendering, themes } from './feno.json';

type PreRenderedAtoms = Record<string, string>;

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

const preRenderElements = (preRenderedAtoms: PreRenderedAtoms) => {
  const collection: Record<string, { atoms: string; styles: string[] }> = {};

  // buttons
  collection['button'] = {
    atoms: themes.map((t) => `${t.elements.button}`).join(' '),
    styles: themes.reduce(
      (acc, curr) => [
        ...acc,
        ...curr.elements.button.split(' ').map((el) => preRenderedAtoms[el]),
      ],
      [] as string[]
    ),
  };
  return collection;
};

const renderAtoms = (preRenderedAtoms: PreRenderedAtoms) => {
  return Object.entries(preRenderedAtoms)
    .map(([theme, atoms]) =>
      Object.entries(atoms)
        .map(([k, v]) => `.${theme} .${theme}_${k} { ${v} }`)
        .join('\n')
    )
    .join('\n');
};

// const renderKitchenSink = () => {
//   // Buttons

//   // const themeButtons = themes
//   //   .map(
//   //     ({ prefix }) => `<button
//   //     class="${themes
//   //       .map(({ elements }) => `${elements.button.atoms}`)
//   //       .join(' ')}"
//   //     onclick="document.body.className='${prefix}'"
//   //   >
//   //     ${prefix}
//   //   </button>`
//   //   )
//   //   .join('');

//   return `<html>
//   <head>
//     <style>${styles}</style>
//   </head>
//   <body class="${themes[0].prefix}">
//   </body>
// </html>`;
// };

const preRenderedAtoms = preRenderAtoms();
const preRenderedElements = preRenderElements(preRenderedAtoms);
console.log(preRenderedElements);
// const styles = [renderAtoms(preRenderedAtoms)].join('\n');
// console.log(preRenderedElements);
// fs.writeFileSync(rendering.outfile, styles, 'utf-8');
// fs.writeFileSync('index.html', renderKitchenSink(), 'utf-8');
