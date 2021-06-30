import { h } from 'x-lib/hyperscript';

interface Button {
  text: string;
  onClick: (e: MouseEvent) => void;
}
export const FlyButton = ({ text, onClick }: Button) => h('button', ['onclick', onClick])(text);
export const RunButton = ({ text, onClick }: Button) => h('button', ['onclick', onClick])(text);
export const WalkButton = ({ text, onClick }: Button) => h('button', ['onclick', onClick])(text);
export const TipToeButton = ({ text, onClick }: Button) => h('button', ['onclick', onClick])(text);
export const StopButton = ({ text, onClick }: Button) => h('button', ['onclick', onClick])(text);
