import { ROOT } from 'src/adaptors/config';
import { DashboardHomeShell } from '../design/elements/Shells';
import { H1 } from '../design/elements/Typography';

export interface HomeOptions {}

export class Home {
  title: string = 'Homw';
  page: HTMLElement = document.querySelector(`#${ROOT}`);
  constructor({}: HomeOptions) {
    this.render();
  }
  render() {
    this.page.innerHTML = '';
    const content = H1('Home');
    this.page.appendChild(DashboardHomeShell({ content }));
  }
}
