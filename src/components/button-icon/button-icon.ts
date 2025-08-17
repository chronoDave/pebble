import h from '@chronocide/hyper';

import * as icon from '../icon/icon.ts';

import './button-icon.scss';

export type ButtonIconProps = {
  icon: Element;
  label: string;
};

const buttonIcon = (icon: Element) =>
  (label: string) => h('button')({
    type: 'button',
    class: 'icon'
  })(icon, h('span')({ class: 'sr-only' })(label));

export default buttonIcon;

export const bars = buttonIcon(icon.bars());
export const xmark = buttonIcon(icon.xmark());
