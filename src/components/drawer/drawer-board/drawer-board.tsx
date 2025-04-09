import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import Icon from '../../icon/icon';
import store from '../../../store/store';
import DrawerBoardTitle from '../drawer-board-title/drawer-board-title';

import selector from './drawer-board.state';
import * as actions from './drawer-board.actions';
import './drawer-board.scss';

export type DrawerBoard = {};

const DrawerBoard: Component<DrawerBoard> = () => {
  const component = new forgo.Component<DrawerBoard>({
    render() {
      const boards = selector.state();

      return (
        <ul
          class='drawer-board'
          onclick={event => {
            const root = event.target as HTMLElement | null;
            const id = root?.closest('li')?.id;
            const action = root?.dataset.action ?? root?.closest('button')?.dataset.action;

            if (typeof id !== 'string') return;
            if (action === 'select') store.set(produce(actions.active(id)));
            if (action === 'delete') store.set(produce(actions.remove(id)));
          }}
        >
          {boards.map(board => (
            <li key={board} id={board}>
              <button type='button' data-action='select'>
                <span class='sr-only'>Select </span>
                <DrawerBoardTitle id={board} />
              </button>
              <button type='button' data-action='delete'>
                <span class='sr-only'>Delete board</span>
                <Icon id='trash' />
              </button>
            </li>
          ))}
        </ul>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default DrawerBoard;
