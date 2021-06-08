import { h } from './hyperscript';

export interface Dom {
  el: HTMLElement;
  swap: (contents: HTMLElement) => void;
  clear: () => void;
}

export const dom = (tag: keyof HTMLElementTagNameMap = 'div', contents: HTMLElement = null): Dom => {
  const el = h(tag)(contents);
  const clear = () => (el.innerHTML = '');
  const swap = (contents: HTMLElement) => {
    clear();
    el.appendChild(contents);
  };
  return { el, swap, clear };
};
