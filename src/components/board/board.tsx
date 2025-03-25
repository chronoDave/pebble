import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Lane from '../lane/lane';
import Icon from '../icon/icon';

import selector, {
  createLane,
  moveCard,
  moveCardUp,
  moveCardDown,
  moveLane
} from './board.state';

import './board.scss';

export type BoardProps = {
  id: string;
};

const Board: Component<BoardProps> = initial => {
  const component = new forgo.Component<BoardProps>({
    render(props) {
      const board = selector.state(props.id);

      if (!board) return null;
      return [
        <article
          class='board'
          onclick={event => {
            const button = (event.target as HTMLElement | null)?.closest('button');
            const card = button?.closest<HTMLElement>('.card');
            const lane = button?.closest<HTMLElement>('.lane');

            if (button?.dataset.action === 'move' && lane && card) {
              if (button.dataset.direction === 'up') moveCardUp(card.id);
              if (button.dataset.direction === 'down') moveCardDown(card.id);
              if (button.dataset.direction === 'end') moveCard(card.id)({ lane: board.lanes[board.lanes.length - 1] });

              if (button.dataset.direction === 'left') {
                const i = board.lanes.indexOf(lane.id);
                if (i > 0) moveCard(card.id)({ lane: board.lanes[i - 1] });
              }

              if (button.dataset.direction === 'right') {
                const i = board.lanes.indexOf(lane.id);
                if (i < board.lanes.length) moveCard(card.id)({ lane: board.lanes[i + 1] });
              }
            }
          }}
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

              const from = {
                card: document.querySelector('[data-grabbed="true"] .card')?.id,
                lane: document.querySelector('.lane > header[data-grabbed="true"]')?.closest('.lane')?.id
              };

              const to = {
                card: (event.target as HTMLElement).closest('.card')?.id,
                lane: (event.target as HTMLElement).closest('.lane')?.id
              };

              if (typeof from.card === 'string') moveCard(from.card)(to);
              if (typeof from.lane === 'string') moveLane(from.lane)(to);
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
                <button type='button' onclick={() => createLane(board.id)}>
                  <Icon id='plus' />
                  Add lane
                </button>
              </div>
            </li>
          </ol>
        </article>,
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

  selector.subscribe(initial.id)(component);

  return component;
};

export default Board;
