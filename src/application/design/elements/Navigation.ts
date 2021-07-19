import { el } from 'src/application/util/El';
import { css } from '../styles/Css';
import { palette } from '../styles/Palette';
import { isTheme } from '../styles/Theme';

enum ClassName {
  wrapper = 'wrapper',
  link = 'link',
}

const style = () =>
  el('style')(
    css(
      ClassName.link,
      ['padding', '20px'],
      ['display', 'inline-flex'],
      ['textDecoration', 'none'],
      ['color', palette.black_100, isTheme('light')],
      ['color', palette.white_100, isTheme('dark')],
    ),
    css(
      ClassName.link + ':hover',
      ['backgroundColor', palette.black_10, isTheme('light')],
      ['backgroundColor', palette.white_10, isTheme('dark')],
    ),
    css(
      ClassName.wrapper,
      ['backgroundColor', palette.black_20, isTheme('light')],
      ['backgroundColor', palette.white_20, isTheme('dark')],
    ),
  );

const view = () =>
  el('div', ['class', ClassName.wrapper])(
    el('a', ['class', ClassName.link], ['href', '?page=home'])('Home'),
    el('a', ['class', ClassName.link], ['href', '?page=design'])('Design'),
  );

export class SiteNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(style());
    this.shadowRoot.appendChild(view());
  }
}
