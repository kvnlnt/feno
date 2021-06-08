import { h } from 'src/lib/hyperscript';

export const ColorPicker = (
  color: string,
  setColor: (color: string) => void,
  label: string
) =>
  h(
    'label',
    [
      'style',
      [
        'border:1px solid black',
        'color:white',
        'width:100px',
        'height:100px',
        'font-size: 14px',
        'display:flex',
        'justify-content:center',
        'align-items:center',
        `background-color: ${color}`,
      ].join(';'),
    ],
    ['oninput', (e: Event) => setColor((<HTMLInputElement>e.target).value)]
  )(
    h('span', ['style', 'mix-blend-mode:difference;'])(label),
    h(
      'input',
      ['type', 'color'],
      ['style', 'visibility: hidden; position:absolute;']
    )()
  );
