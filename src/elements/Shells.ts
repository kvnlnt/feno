import { h } from 'src/lib/hyperscript';

interface Shell {
  menu: HTMLElement;
  content: HTMLElement;
}

export const ShellMain = ({ menu, content }: Shell) =>
  h('div', [
    'style',
    [
      'display:grid',
      'grid-template-areas: "menu" "content"',
      'grid-template-rows: min-content auto',
      'grid-template-columns: auto',
    ].join(';'),
  ])(
    h('div', ['style', 'grid-area: menu'])(menu),
    h('div', ['style', 'grid-area: content'])(content)
  );
