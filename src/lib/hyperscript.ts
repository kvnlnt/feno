enum NamespaceEnum {
  xhtml = 'http://www.w3.org/1999/xhtml',
  svg = 'http://www.w3.org/2000/svg',
}

export const H: Record<string, Element> = {};

type Tags<T extends keyof HTMLElementTagNameMap> = {
  tag: T | string;
  attrs?: Attrs<T>[];
  children: Tags<T>[];
};

export type Attrs<X extends keyof Partial<HTMLElementTagNameMap>> = [
  Extract<keyof HTMLElementTagNameMap[X], string> | 'class',
  string | number | Function
];

function Hyperscript<T extends keyof HTMLElementTagNameMap>(
  { tag, attrs = [], children = [] }: Tags<T>,
  namespace: NamespaceEnum = NamespaceEnum.xhtml
) {
  const h: Element = document.createElementNS(namespace, tag);
  attrs.forEach(([k, v]: Attrs<T>) => {
    if (v === void 0 || v === null) return; // don't render undefined or null props
    if (typeof v === 'function') {
      // remove "on" from the beginning of the event
      const eventName = k.replace(/^on(.*)/, '$1');
      h.addEventListener(eventName, (e) => v(e));
    } else {
      h.setAttribute(k, v.toString());
    }
    // add it to the H collection
    if (k === 'id') H[v as string] = h;
  });
  children.forEach((child) => {
    if (child instanceof Node) h.appendChild(child);
    if (typeof child === 'string') h.innerHTML += child;
  });
  return h;
}

export function h<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  ...attrs: Attrs<T>[]
): Function {
  return (...children: Tags<T>[]) => Hyperscript<T>({ tag, attrs, children });
}

export function hvg<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  ...attrs: Attrs<T>[]
): Function {
  return (...children: Tags<T>[]) =>
    Hyperscript<T>({ tag, attrs, children }, NamespaceEnum.svg);
}
