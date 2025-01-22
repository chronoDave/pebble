import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Icon from '../../../components/icon/icon';

import selector, { set } from './card-contextmenu.state';

export type CardContextMenuProps = {
  id: string;
};

const CardContextMenu: Component<CardContextMenuProps> = initial => {
  const component = new forgo.Component<CardContextMenuProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <div class="contextmenu">
          <button
            type='button'
            aria-controls={props.id}
            aria-expanded={expanded}
            onclick={() => set(expanded ? null : props.id)}
          >
            <Icon id='ellipsisVertical' />
          </button>
          <ul
            id={props.id}
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              if (button) set(null);
            }}
          >
            <li>
              <button
                type="button"
                data-action="move"
                data-direction="left"
              >
                <Icon id='arrowLeft' />
                <span>Move left</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                data-action="move"
                data-direction="right"
              >
                <Icon id='arrowRight' />
                <span>Move right</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                data-action="move"
                data-direction="up"
              >
                <Icon id='arrowUp' />
                <span>Move up</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                data-action="move"
                data-direction="down"
              >
                <Icon id='arrowDown' />
                <span>Move down</span>
              </button>
            </li>
            <li role="separator"></li>
            <li>
              <button
                type="button"
                data-action="remove"
              >
                <Icon id='trash' />
                <span>Remove card</span>
              </button>
            </li>
          </ul>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default CardContextMenu;
