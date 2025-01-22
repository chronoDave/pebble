import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../components/icon/icon';

import selector, {
  set,
  moveLeft,
  moveRight,
  remove
} from './lane-contextmenu.state';

import './lane-contextmenu.scss';

export type LaneContextmenuProps = {
  id: string;
  board: string;
  lane: string;
  autoclose?: boolean;
};

const LaneContextmenu: Component<LaneContextmenuProps> = initial => {
  const component = new forgo.Component<LaneContextmenuProps>({
    render(props) {
      const expanded = selector.state(props.id);

      return (
        <div class="lane-contextmenu">
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

              if (button && props.autoclose !== false) set(null);
            }}
          >
            <li>
              <button
                type="button"
                onclick={() => moveLeft({
                  board: props.board,
                  lane: props.lane
                })}
              >
                <Icon id='arrowLeft' />
                <span>Move left</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onclick={() => moveRight({
                  board: props.board,
                  lane: props.lane
                })}
              >
                <Icon id='arrowRight' />
                <span>Move right</span>
              </button>
            </li>
            <li role="separator"></li>
            <li>
              <button 
                type="button"
                onclick={() => remove({
                  board: props.board,
                  lane: props.lane
                })}
              >
                <Icon id='trash' />
                <span>Remove lane</span>
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

export default LaneContextmenu;
