import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import store from '../../../store/store';
import Icon from '../../icon/icon';
import DrawerBoardTitle from '../drawer-board-title/drawer-board-title';

import selector from './drawer-board.state';
import * as actions from './drawer-board.actions';
import './drawer-grid-board.scss';

export type DrawerGridBoard = {
  id: string;
};

const DrawerGridBoard: Component<DrawerGridBoard> = () => {
  const component = new forgo.Component<DrawerGridBoard>({
    render(props) {
      const state = selector.state();

      return (
        <div
          id={props.id}
          class='drawer-board'
          role='grid'
          aria-labelledby={`${props.id}-title`}
          aria-rowcount={state.boards.length}
          onkeydown={event => {
            if (event.key === 'ArrowUp') actions.focusRowUp(event.currentTarget);
            if (event.key === 'ArrowDown') actions.focusRowDown(event.currentTarget);
            if (event.key === 'ArrowLeft') actions.focusColumnLeft(event.currentTarget);
            if (event.key === 'ArrowRight') actions.focusColumnRight(event.currentTarget);
          }}
          onclick={event => {
            const root = event.target as HTMLElement | null;
            if (!root) return;

            const id = root.closest('[role="row"]')?.id;
            if (typeof id !== 'string') return;

            const action = root.dataset.action ?? root.closest('button')?.dataset.action;
            if (action === 'select') store.set(produce(actions.active(id)));
            if (action === 'delete') {
              store.set(produce(actions.remove(id)));
              actions.focusDelete(root, event.currentTarget);
            }
          }}
          tabindex={-1}
        >
          {state.boards.length === 0 ?
            <p>No boards found</p> :
            state.boards.map((board, i) => (
              <div
                key={board}
                id={board}
                role='row'
                aria-rowindex={i + 1}
                aria-colcount={2}
                aria-current={state.active === board}
              >
                <div role='gridcell' aria-colindex='1'>
                  <button type='button' data-action='select' tabindex={i === 0 ? 0 : -1}>
                    <DrawerBoardTitle id={board} />
                  </button>
                </div>
                <div role='gridcell' aria-colindex='2'>
                  <button type='button' data-action='delete' tabindex={-1}>
                    <span class='sr-only'>Remove</span>
                    <Icon id='trash' />
                  </button>
                </div>
              </div>
            ))}
        </div>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default DrawerGridBoard;
