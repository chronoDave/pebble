import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as ICON from '../lib/icon';

import './icon.scss';

export type IconProps = {
  id: keyof typeof ICON; 
};

const Icon: Component<IconProps> = () => {
  const component = new forgo.Component<IconProps>({
    render(props) {
      const { viewBox, d } = ICON[props.id];

      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          aria-hidden='true'
          data-icon={props.id}
        >
          <path d={d} />
        </svg>
      );
    }
  });

  return component;
};

export default Icon;
