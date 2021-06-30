type rgba = `rgba(${number},${number},${number},${number})`;

interface Theme {
  success_bg: rgba;
  success_fg: rgba;
  success_fc: rgba;
  warning_bg: rgba;
  warning_fg: rgba;
  warning_fc: rgba;
  danger_bg: rgba;
  danger_fg: rgba;
  danger_fc: rgba;
  info_bg: rgba;
  info_fg: rgba;
  info_fc: rgba;
  mute_bg: rgba;
  mute_fg: rgba;
  mute_fc: rgba;
}

const dark: Theme = {
  success_bg: 'rgba(0,0,0,1)',
  success_fg: 'rgba(0,0,0,1)',
  success_fc: 'rgba(0,0,0,1)',
  warning_bg: 'rgba(0,0,0,1)',
  warning_fg: 'rgba(0,0,0,1)',
  warning_fc: 'rgba(0,0,0,1)',
  danger_bg: 'rgba(0,0,0,1)',
  danger_fg: 'rgba(0,0,0,1)',
  danger_fc: 'rgba(0,0,0,1)',
  info_bg: 'rgba(0,0,0,1)',
  info_fg: 'rgba(0,0,0,1)',
  info_fc: 'rgba(0,0,0,1)',
  mute_bg: 'rgba(0,0,0,1)',
  mute_fg: 'rgba(0,0,0,1)',
  mute_fc: 'rgba(0,0,0,1)',
};

const light: Theme = {
  success_bg: 'rgba(255,255,255,1)',
  success_fg: 'rgba(255,255,255,1)',
  success_fc: 'rgba(255,255,255,1)',
  warning_bg: 'rgba(255,255,255,1)',
  warning_fg: 'rgba(255,255,255,1)',
  warning_fc: 'rgba(255,255,255,1)',
  danger_bg: 'rgba(255,255,255,1)',
  danger_fg: 'rgba(255,255,255,1)',
  danger_fc: 'rgba(255,255,255,1)',
  info_bg: 'rgba(255,255,255,1)',
  info_fg: 'rgba(255,255,255,1)',
  info_fc: 'rgba(255,255,255,1)',
  mute_bg: 'rgba(255,255,255,1)',
  mute_fg: 'rgba(255,255,255,1)',
  mute_fc: 'rgba(255,255,255,1)',
};

const render = (name: string, theme: Theme): void => {
  const styles: string[] = [];
  Object.entries(theme).forEach(([k, v]) => styles.push(`--${k}: ${v};`));
  const style = document.createElement('style');
  style.id = name;
  style.innerHTML = `.${name} {\n ${styles.join('\n')} \n}`;
  document.getElementsByTagName('head')[0].appendChild(style);
};

const reset = () => {
  const style = document.createElement('style');
  style.id = 'reset';
  style.innerHTML = `html, body { margin:0; }`;
  document.getElementsByTagName('head')[0].appendChild(style);
};

export const Styles = ({ theme }: { theme: 'dark' | 'light' }) => {
  reset();
  render('dark', dark);
  render('light', light);
  document.body.classList.add(theme);
};

type CssCustomProperty = `var(--${string})`;
type CssKeys = keyof typeof dark;
export const theme = ((): {
  [key in CssKeys]: CssCustomProperty;
} => {
  const css: any = {};
  Object.entries(dark).forEach(([k]) => (css[k] = `var(--${k})`));
  return css;
})();
