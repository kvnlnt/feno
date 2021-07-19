export function css(selector: string, ...props: [keyof CSSStyleDeclaration, string | number, boolean?][]) {
  return `\n.${selector} { ${props
    .filter((prop) => (prop[2] === false ? false : true))
    .map(([property, value]) => `${(<string>property).replace(/([A-Z])/g, '-$1').toLowerCase()}:${value};`)
    .join(' ')} }`;
}
