import { PAGES } from 'src/adaptors/config';
import { VerticalMenu } from '../design/elements/Menus';
import { ShellMain } from '../design/elements/Shells';

export interface DesignSystemOptions {
  section: DesignSystemSections;
}

export type DesignSystemSections =
  | ''
  | 'boxes'
  | 'buttons'
  | 'forms'
  | 'grids'
  | 'menus'
  | 'pickers'
  | 'shells'
  | 'typography';

export class DesignSystem {
  title: string = 'Design System';
  page: HTMLElement = document.querySelector('#page');
  section: DesignSystemSections = 'buttons';
  constructor({ section }: DesignSystemOptions) {
    this.section = section;
    this.render();
  }
  render() {
    this.page.innerHTML = '';
    const content = VerticalMenu([
      {
        text: 'Boxes',
        href: `?page=${PAGES.DESIGN}&section=boxes`,
        isSelected: this.section === 'boxes',
      },
      { text: 'Buttons', href: `?page=${PAGES.DESIGN}&section=buttons`, isSelected: this.section === 'buttons' },
      {
        text: 'Forms',
        href: `?page=${PAGES.DESIGN}&section=forms`,
        isSelected: this.section === 'forms',
      },
      {
        text: 'Grids',
        href: `?page=${PAGES.DESIGN}&section=grids`,
        isSelected: this.section === 'grids',
      },
      {
        text: 'Menus',
        href: `?page=${PAGES.DESIGN}&section=menus`,
        isSelected: this.section === 'menus',
      },
      {
        text: 'Pickers',
        href: `?page=${PAGES.DESIGN}&section=pickers`,
        isSelected: this.section === 'pickers',
      },
      {
        text: 'Shells',
        href: `?page=${PAGES.DESIGN}&section=shells`,
        isSelected: this.section === 'shells',
      },
      {
        text: 'Typography',
        href: `?page=${PAGES.DESIGN}&section=typography`,
        isSelected: this.section === 'typography',
      },
    ]);
    this.page.appendChild(ShellMain({ content }));
  }
  static getSectionByString(str: string): DesignSystemSections {
    let section: DesignSystemSections = '';
    if (str === 'boxes') section = 'boxes';
    if (str === 'buttons') section = 'buttons';
    if (str === 'forms') section = 'forms';
    if (str === 'grids') section = 'grids';
    if (str === 'menus') section = 'menus';
    if (str === 'pickers') section = 'pickers';
    if (str === 'shells') section = 'shells';
    if (str === 'typography') section = 'typography';
    return section;
  }
}
