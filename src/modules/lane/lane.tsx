import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import contentEditable from '../../lib/contentEditable/contentEditable';
import Card from '../card/card';
import Icon from '../../components/icon/icon';
import Contextmenu from '../../components/contextmenu/contextmenu';
import selector, {
  setTitle,
  createCard,
  removeCard,
  moveLeft,
  moveRight,
  remove
} from './lane.state';

import './lane.scss';

export type LaneProps = {
  board: string;
  lane: string;
};

const Lane: Component<LaneProps> = initial => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const lane = selector.state(props.lane);

      if (!lane) return null;
      return (
        <article id={lane.id} class='lane' data-size={lane.cards.length}>
          <header draggable data-grabbed={false} data-dropzone>
            <hgroup>
              <h2
                {...contentEditable}
                onblur={event => setTitle(lane)((event.target as HTMLHeadingElement).innerText)}
              >
                {lane.title ?? 'New lane'}
              </h2>
              <span class='badge'>{lane.cards.length}</span>
            </hgroup>
            <div class='actions'>
              <button type='button' onclick={() => createCard(props.lane)('start')}>
                <Icon id='plus' />
                <span class='sr-only'>Add card</span>
              </button>
              <Contextmenu id={`contextmenu-${lane.id}`}>
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
              </Contextmenu>
            </div>
          </header>
          <ol
            class="unstyled"
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const card = button?.closest<HTMLElement>('.card');

              if (button?.dataset.action === 'delete' && card) {
                removeCard(props.lane)(card.id);
              }
            }}
          >
            {lane.cards.map(card => (
              <li
                key={card}
                draggable
                data-grabbed={false}
                data-dropzone
              >
                <Card id={card} />
              </li>
            ))}
            <li data-dropzone>
              <button
                type='button'
                onclick={() => createCard(props.lane)('end')}
              >
                <Icon id='plus' />
                Add card
              </button>
            </li>
          </ol>
        </article>
      );
    }
  });

  selector.subscribe(initial.lane)(component);

  return component;
};

export default Lane;
