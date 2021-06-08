import { h } from 'src/lib/hyperscript';

export const Form = h(
  'form',
  ['onsubmit', (e: Event) => e.preventDefault()],
  [
    'style',
    [
      'display:flex',
      'justify-content:center',
      'align-items:center',
      'height:100%',
      'flex-direction:column',
    ].join(';'),
  ]
);

export const Fieldset = h('fieldset', ['style', 'display:block; border:0;']);
export const Field = h('div', ['style', 'display:block; margin-bottom:10px']);
export const Label = h('label', ['style', 'display:block;']);
export const Legend = h('legend', [
  'style',
  'display:block; margin-bottom:10px;',
]);

interface TextInputProps {
  placeholder?: string;
  value: string;
  onInput?: (e: InputEvent) => void;
}
export const TextInput = ({ value, onInput, placeholder }: TextInputProps) =>
  h(
    'input',
    ['type', 'text'],
    ['style', 'display:block'],
    ['value', value],
    ['oninput', onInput],
    ['placeholder', placeholder]
  )();

export const ColorInput = ({ value, onInput, placeholder }: TextInputProps) =>
  h(
    'input',
    ['type', 'color'],
    ['style', 'display:block'],
    ['value', value],
    ['onchange', onInput],
    ['placeholder', placeholder]
  )();
