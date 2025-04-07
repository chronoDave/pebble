import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';
import uid from '../../lib/string/uid';

import State from './contextmenu.state';

import './contextmenu.scss';

export type ContextmenuProps = {
  title: string;
};

const Contextmenu: Component<ContextmenuProps> = () => {
  const id = uid();
  const state = new State<ContextmenuProps>(id);
  const component = new forgo.Component<ContextmenuProps>({
    render(props) {
      return (
        <div id={id} class="contextmenu">
          <button
            type="button"
            aria-controls={`${id}-container`}
            aria-expanded={state.expanded}
            onclick={() => {
              state.expanded = !state.expanded;
            }}
          >
            <span class='sr-only'>{props.title}</span>
            <Icon id='ellipsisVertical' />
          </button>
          <div
            id={`${id}-container`}
            class='card'
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              if (button) state.expanded = false;
            }}
          >
            {props.children}
          </div>
        </div>
      );
    }
  });

  state.subscribe(component);

  return component;
};

export default Contextmenu;
