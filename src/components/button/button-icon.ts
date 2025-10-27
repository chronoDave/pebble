import h from '@chronocide/hyper';

import './button-icon.scss';

export default (icon: Element) =>
  (label: string) =>
    h('button')({ type: 'button' })(
      icon,
      h('span')({ class: 'sr-only' })(label)
    );
