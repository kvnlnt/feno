import { SiteMenu } from '../design/elements/Menus';
import { ShellMain } from '../design/elements/Shells';
import { H1 } from '../design/elements/Typography';

export interface HomeOptions {}

export class Home {
  title: string = 'Homw';
  page: HTMLElement = document.querySelector('#page');
  constructor({}: HomeOptions) {
    this.render();
  }
  render() {
    this.page.innerHTML = '';
    const menu = SiteMenu();
    const content = H1('Home');
    this.page.appendChild(ShellMain({ menu, content }));
  }
}
