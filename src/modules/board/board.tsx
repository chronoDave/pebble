import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Lane from '../lane/lane';
import Icon from '../../components/icon/icon';

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
  let hovered: HTMLElement | null = null;

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
            (event.target as HTMLElement).setAttribute('data-grabbed', 'false');
          }}
          ondragover={event => {
            event.preventDefault();

            const dropzone = (event.target as HTMLElement).closest('[data-dropzone="true"]');
            if (event.dataTransfer) event.dataTransfer.dropEffect = dropzone ? 'move' : 'none';
          }}
          ondragenter={event => {
            hovered = (event.target as HTMLElement).closest('[data-dropzone="true"]');
            hovered?.setAttribute('data-hover', 'true');
          }}
          ondragleave={event => {
            const el = (event.target as HTMLElement).closest('[data-dropzone="true"]');

            if (el !== hovered) {
              el?.setAttribute('data-hover', 'false');
              hovered?.setAttribute('data-hover', 'false');
              hovered = null;
            }
          }}
          ondrop={event => {
            const dropzone = (event.target as HTMLElement).closest('[data-dropzone="true"]');
            dropzone?.setAttribute('data-hover', 'false');

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
