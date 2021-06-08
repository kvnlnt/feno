import { Dom } from 'src/lib/dom';
import { h } from 'src/lib/hyperscript';

export default class Elements {
  container: Dom;
  constructor(container: Dom) {
    this.container = container;
    this.render = this.render.bind(this);
    this.transition = this.transition.bind(this);
  }
  transition() {
    this.render();
  }
  render() {
    const el = h('div')('elements');
    this.container.swap(el);
  }
}
