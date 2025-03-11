import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Icon from '../icon/icon';

import selector, { setActive, removeBoard } from './list-board.state';

import './list-board.scss';

export type ListBoardProps = {};

const ListBoard: Component<ListBoardProps> = () => {
  const component = new forgo.Component<ListBoardProps>({
    render() {
      const state = selector.state();

      return (
        <ul
          class='list-board'
          onclick={event => {
            const key = (event.target as HTMLLIElement | null)?.closest('li')?.getAttribute('key');
            const action = (event.target as HTMLButtonElement | null)?.closest('button')?.dataset.action;

            if (typeof key === 'string') {
              if (action === 'delete') {
                removeBoard(key);
                event.stopPropagation();
              }

              if (action === 'select') {
                setActive(key);
                event.stopPropagation();
              }
            }
          }}
        >
          {state.boards.map(board => {
            const title = board.title ?? 'New board';

            return (
              <li key={board.id} aria-current={state.active == board.id}>
                <button type='button' data-action='select'>
                  <span class='sr-only'>Select </span>
                  {title}
                </button>
                <button type='button' data-action='delete'>
                  <Icon id='trash' />
                  <span class='sr-only'>Remove {title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default ListBoard;
