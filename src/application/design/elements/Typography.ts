export const H1 = (text: string): HTMLElement => {
  const el = document.createElement('h1');
  el.innerText = text;
  return el;
};

export const H2 = (text: string): HTMLElement => {
  const el = document.createElement('h2');
  el.innerText = text;
  return el;
};

export const H3 = (text: string): HTMLElement => {
  const el = document.createElement('h3');
  el.innerText = text;
  return el;
};

export const P = (text: string): HTMLElement => {
  const el = document.createElement('p');
  el.innerText = text;
  return el;
};

export const Title = (text: string): HTMLElement => {
  const el = document.createElement('title');
  el.innerText = text;
  return el;
};
