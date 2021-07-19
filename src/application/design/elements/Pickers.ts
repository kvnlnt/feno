import { LOCAL_STORAGE } from 'src/adaptors/config';
import { setTheme, Themes } from '../styles/Theme';

export const ThemePicker = (): HTMLSelectElement => {
  const selectedItem: Themes = <Themes>localStorage.getItem(LOCAL_STORAGE.THEME);
  const select = document.createElement('select');
  function handleChange() {
    let val: Themes;
    if (this.value === 'light') val = 'light';
    if (this.value === 'dark') val = 'dark';
    setTheme(val);
    window.location.reload();
  }
  select.addEventListener('change', handleChange);
  const optionLight = document.createElement('option');
  optionLight.innerText = 'light';
  optionLight.value = 'light';
  optionLight.selected = selectedItem === 'light';
  select.appendChild(optionLight);
  const optionDark = document.createElement('option');
  optionDark.value = 'dark';
  optionDark.innerText = 'dark';
  optionDark.selected = selectedItem === 'dark';
  select.appendChild(optionDark);
  return select;
};

// import { h } from 'src/application/lib/hyperscript';

// export const ColorPicker = (color: string, setColor: (color: string) => void, label: string) =>
//   h(
//     'label',
//     [
//       'style',
//       [
//         'border:1px solid black',
//         'color:white',
//         'width:100px',
//         'height:100px',
//         'font-size: 14px',
//         'display:flex',
//         'justify-content:center',
//         'align-items:center',
//         `background-color: ${color}`,
//       ].join(';'),
//     ],
//     ['oninput', (e: Event) => setColor((<HTMLInputElement>e.target).value)],
//   )(
//     h('span', ['style', 'mix-blend-mode:difference;'])(label),
//     h('input', ['type', 'color'], ['style', 'visibility: hidden; position:absolute;'])(),
//   );
