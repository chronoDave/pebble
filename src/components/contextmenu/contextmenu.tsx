import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import selector, { set } from './contextmenu.state';

import './contextmenu.scss';

export type ContextmenuProps = {
  id: string;
};

const Contextmenu: Component<ContextmenuProps> = initial => {
  const component = new forgo.Component<ContextmenuProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <div class="contextmenu">
          <button
            type="button"
            aria-controls={props.id}
            aria-expanded={expanded}
            onclick={() => set(expanded ? null : props.id)}
          >
            <Icon id='ellipsisVertical' />
          </button>
          <div
            class='card'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              if (button) set(null);
            }}
          >
            {props.children}
          </div>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Contextmenu;
