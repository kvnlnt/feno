// TODO: Remove

enum NamespaceEnum {
  xhtml = 'http://www.w3.org/1999/xhtml',
  svg = 'http://www.w3.org/2000/svg',
}

type Tags<T extends keyof HTMLElementTagNameMap> = {
  tag: T | string;
  attrs?: Attrs<T>[];
  children: Tags<T>[];
};

type Attrs<X extends keyof Partial<HTMLElementTagNameMap>> = [
  Extract<keyof HTMLElementTagNameMap[X], string> | 'class',
  string | number | Function,
];

function EL<T extends keyof HTMLElementTagNameMap>(
  { tag, attrs = [], children = [] }: Tags<T>,
  namespace: NamespaceEnum = NamespaceEnum.xhtml,
) {
  const el: Element = document.createElementNS(namespace, tag);
  attrs.forEach(([k, v]: Attrs<T>) => {
    if (typeof v === 'function') {
      el.addEventListener(k.substring(2, k.length), (e) => v(e));
    } else {
      el.setAttribute(k, v.toString());
    }
  });
  children.forEach((child) => {
    if (child instanceof Node) el.appendChild(child);
    if (typeof child === 'string') el.innerHTML += child;
  });
  return el;
}

export function el<T extends keyof HTMLElementTagNameMap>(tag: T, ...attrs: Attrs<T>[]): Function {
  return (...children: Tags<T>[]) => EL<T>({ tag, attrs, children });
}

export function elSvg<T extends keyof HTMLElementTagNameMap>(tag: T, ...attrs: Attrs<T>[]): Function {
  return (...children: Tags<T>[]) => EL<T>({ tag, attrs, children }, NamespaceEnum.svg);
}
