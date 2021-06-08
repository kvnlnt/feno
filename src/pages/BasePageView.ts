import { Dom } from 'src/lib/dom';

export interface BasePageViewProps {}

export class BasePageView {
  constructor({}: BasePageViewProps) {}
  render(root: Dom) {
    // noop
  }
}
