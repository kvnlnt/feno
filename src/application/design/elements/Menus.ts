import { isTheme, style } from '../styles/Theme';

interface MenuItem {
  text: string;
  href: string;
  isSelected: boolean;
}

export const VerticalMenu = (items: MenuItem[]): HTMLUListElement => {
  const ul = document.createElement('ul');
  ul.style.backgroundColor = style(['black_10', isTheme('light')], ['black_90', isTheme('dark')]);
  items.forEach(({ text, href, isSelected = false }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerText = text;
    a.href = href;
    if (isSelected) a.style.fontWeight = 'bold';
    li.appendChild(a);
    ul.appendChild(li);
  });
  return ul;
};
