import { h } from 'src/lib/h';

const MainMenuItem = (href: string, text: string) =>
  h('a', ['href', href], ['style', ''])(text);

export const MainMenu = () =>
  h('div', [
    'style',
    ['display:flex', 'justify-content:space-evenly', 'padding:20px;'].join(';'),
  ])(
    MainMenuItem('', 'Start'),
    MainMenuItem('/#/types', 'Types'),
    MainMenuItem('/#/atoms', 'Atoms'),
    MainMenuItem('/#/elements', 'Elements'),
    MainMenuItem('/#/components', 'Components')
  );
