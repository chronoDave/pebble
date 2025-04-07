import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import store from '../../store/store';
import Lane from '../lane/lane';
import Icon from '../icon/icon';

import selector from './board.state';
import * as actions from './board.actions';

import './board.scss';

export type BoardProps = {};

const Board: Component<BoardProps> = () => {
  const component = new forgo.Component<BoardProps>({
    render() {
      const board = selector.state();

      if (!board) return null;
      return [
        <main
          class='board'
          ondragstart={event => {
            const root = event.target as HTMLElement;

            if (event.dataTransfer) {
              event.dataTransfer.effectAllowed = 'move';
              event.dataTransfer.dropEffect = 'move';
              root.setAttribute('data-grabbed', 'true');
            }
          }}
          ondragend={event => {
            (event.target as HTMLElement).removeAttribute('data-grabbed');
          }}
          ondragover={event => {
            const type = document.querySelector<HTMLElement>('[data-grabbed="true"]')?.dataset.draggable ?? null;
            if (type === null) return;

            event.preventDefault();

            const dropzone = (event.target as HTMLElement).closest(`[data-dropzone="${type}"]`);
            if (event.dataTransfer) event.dataTransfer.dropEffect = dropzone ? 'move' : 'none';
          }}
          ondragenter={event => {
            const type = document.querySelector<HTMLElement>('[data-grabbed="true"]')?.dataset.draggable ?? null;
            if (type === null) return;

            const root = event.target as HTMLElement;
            const dropzone = root.closest(`[data-dropzone="${type}"]`);

            if (dropzone) {
              document.querySelector('[data-hover="true"]')?.removeAttribute('data-hover');
              root.closest('[draggable="true"]')?.setAttribute('data-hover', 'true');
            }
          }}
          ondragleave={event => {
            const type = document.querySelector<HTMLElement>('[data-grabbed="true"]')?.dataset.draggable ?? null;
            if (type === null) return;

            const root = event.target as HTMLElement;
            const dropzone = root.closest(`[data-dropzone="${type}"]`);
            const active = document.querySelector('[data-hover="true"]');
          
            if (!dropzone || root.closest('[draggable="true"]') !== active) {
              active?.removeAttribute('data-hover');
            }
          }}
          ondrop={event => {
            const type = document.querySelector<HTMLElement>('[data-grabbed="true"]')?.dataset.draggable ?? null;
            if (type === null) return;

            const dropzone = (event.target as HTMLElement).closest(`[data-dropzone="${type}"]`);
            document.querySelector('[data-hover="true"]')?.removeAttribute('data-hover');
            
            if (dropzone) {
              event.preventDefault();

              const id = document.querySelector('.lane > header[data-grabbed="true"]')?.closest('.lane')?.id;
              const to = (event.target as HTMLElement).closest('.lane')?.id;
              const i = Array.from(document.querySelectorAll('.lane').values()).findIndex(el => el.id === to);

              if (typeof id === 'string') store.set(produce(actions.move(board.id)(id)(i)));
            }
          }}
        >
          <ol class="unstyled">
            {board.lanes.map(lane => (
              <li key={lane}>
                <Lane lane={lane} board={board.id} />
              </li>
            ))}
            <li>
              <div class='lane'>
                <button
                  type='button'
                  onclick={() => store.set(produce(actions.lane(board.id)))}
                >
                  <Icon id='plus' />
                  Add lane
                </button>
              </div>
            </li>
          </ol>
        </main>,
        <div class='bg'>
          {typeof board.background === 'string' ? (
            <img
              src={board.background}
              loading='lazy'
              alt=''
            />
          ) : null}
        </div>
      ];
    }
  });

  selector.subscribe()(component);

  return component;
};

export default Board;
