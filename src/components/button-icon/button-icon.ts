import h from '@chronocide/hyper';

import './button-icon.scss';

export type ButtonIconProps = {
  icon: Element;
  label: string;
};

export default (props: ButtonIconProps) => h('button')({
  type: 'button',
  class: 'icon'
})(
  props.icon,
  h('span')({ class: 'sr-only' })(props.label)
);
