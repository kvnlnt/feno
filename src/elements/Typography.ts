import { Attrs, h } from 'src/lib/hyperscript';

export const H1 = (
  text: string,
  ...attrs: Attrs<keyof HTMLElementTagNameMap>[]
) => h('h1', ...attrs)(text);
export const H2 = h('h2');
export const H3 = h('h3');
export const P = h('p');
export const Title = h('div');
