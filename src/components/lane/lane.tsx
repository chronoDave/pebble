import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import contentEditable from '../../lib/contentEditable/contentEditable';
import Card from '../card/card';
import Icon from '../icon/icon';
import Contextmenu from '../contextmenu/contextmenu';

import selector from './lane.state';
import * as actions from './lane.actions';

import './lane.scss';

export type LaneProps = {
  id: string;
};

const Lane: Component<LaneProps> = initial => {
  const component = new forgo.Component<LaneProps>({
    render(props) {
      const lane = selector.state(props.id);

      if (!lane) return null;
      return (
        <article id={lane.id} class='lane' data-size={lane.cards.length}>
          <header draggable data-dropzone="lane" data-draggable="lane">
            <hgroup>
              <h2
                {...contentEditable}
                onblur={event => {
                  const title = (event.target as HTMLHeadingElement).innerText;

                  if (title !== lane.title) window.store.set(produce(actions.title(lane.id)(title)));
                }}
              >
                {lane.title ?? 'New lane'}
              </h2>
              <span class='badge'>{lane.cards.length}</span>
            </hgroup>
            <div class='actions'>
              <button
                type='button'
                onclick={() => window.store.set(produce(actions.card(lane.id).unshift))}
              >
                <Icon id='plus' />
                <span class='sr-only'>Add card</span>
              </button>
              <Contextmenu title='Open lane menu'>
                <li>
                  <button
                    type="button"
                    data-action='move'
                    data-direction='left'
                  >
                    <Icon id='arrowLeft' />
                    <span>Move left</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-action='remove'
                    data-direction='right'
                  >
                    <Icon id='arrowRight' />
                    <span>Move right</span>
                  </button>
                </li>
                <li role="separator"></li>
                <li>
                  <button type="button" data-action='remove'>
                    <Icon id='trash' />
                    <span>Remove lane</span>
                  </button>
                </li>
              </Contextmenu>
            </div>
          </header>
          <ol
            class="unstyled"
            data-dropzone="card"
            onclick={event => {
              const button = (event.target as HTMLElement | null)?.closest('button');
              const card = button?.closest<HTMLElement>('.card');

              if (button?.dataset.action === 'delete' && card) {
                window.store.set(produce(actions.card(lane.id).remove(card.id)));
              }
            }}
          >
            {lane.cards.map(card => (
              <li key={card} draggable data-draggable="card">
                <Card id={card} />
              </li>
            ))}
            <li>
              <button
                type='button'
                onclick={() => window.store.set(produce(actions.card(lane.id).push))}
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

  selector.subscribe(initial.id)(component);

  return component;
};

export default Lane;
