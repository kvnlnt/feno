import { PAGES } from 'src/adaptors/config';
import { theme } from '../styles/Theme';

interface MenuItem {
  text: string;
  href: string;
  isSelected: boolean;
}

export const SiteMenu = (): HTMLDivElement => {
  const Item = (href: string, text: string): HTMLAnchorElement => {
    const el = document.createElement('a');
    el.href = href;
    el.innerText = text;
    return el;
  };

  const el: HTMLDivElement = document.createElement('div');
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'space-evenly';
  el.style.padding = '20px';
  el.appendChild(Item(`?page=${PAGES.HOME}`, 'Home'));
  el.appendChild(Item(`?page=${PAGES.DESIGN}`, 'Design'));
  return el;
};

export const VerticalMenu = (items: MenuItem[]): HTMLUListElement => {
  const ul = document.createElement('ul');
  ul.style.backgroundColor = theme.success_fc;
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
