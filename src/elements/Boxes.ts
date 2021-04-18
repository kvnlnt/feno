import { h } from 'src/lib/h';

export const BoxRow = h('div', ['style', 'display:flex; flex-direction:row;']);

export const BoxColumn = h('div', [
  'style',
  'display:flex; flex-direction:column;',
]);

export const Space = h('div', ['style', 'margin:5px']);
