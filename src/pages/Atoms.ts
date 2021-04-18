import { Dom } from 'src/lib/dom';
import { h } from 'src/lib/h';

export default class Atoms {
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
    const el = h('div')('atoms');
    this.container.swap(el);
  }
}
