import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import contentEditable from '../../lib/contentEditable/contentEditable';
import Icon from '../../components/icon/icon';
import CollapseTags from './collapse-tags/collapse-tags';
import CollapseButton from '../../components/collapse-button/collapse-button';
import Contextmenu from '../../components/contextmenu/contextmenu';
import Tasklist from '../tasklist/tasklist';
import selector, {
  setTitle,
  setDescription,
  removeCategory
} from './card.state';
import Tag from './tag/tag';

import './card.scss';

export type CardProps = {
  id: string;
};

const Card: Component<CardProps> = initial => {
  const component = new forgo.Component<CardProps>({
    render(props) {
      const card = selector.state(props.id);
      const id = { tags: `${props.id}-tags`, actions: `${props.id}-actions` };

      if (!card) return null;
      return (
        <article id={card.id} class='card'>
          <header>
            <button
              type='button'
              data-action='move'
              data-direction='end'
            >
              <Icon id='circle' />
              <span class='sr-only'>Mark card as complete</span>
            </button>
            <h3
              {...contentEditable}
              onblur={event => {
                const title = (event.target as HTMLHeadingElement).innerText;
                if (card.title !== title) setTitle(props.id)(title);
              }}
            >
              {card.title ?? 'New card'}
            </h3>
            <div class='actions'>
              <CollapseButton id={id.tags}>
                <Icon id='tag' />
                <span class='sr-only'>Open tags collapse</span>
              </CollapseButton>
              <Contextmenu id={`contextmenu-${props.id}`}>
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
              </Contextmenu>
            </div>
            {card.categories.length > 0 ? (
              <ul
                class='tags'
                onclick={event => {
                  const button = (event.target as HTMLElement | null)?.closest('button');
                  const tag = button?.closest<HTMLElement>('.tag');

                  if (button?.dataset.action === 'delete' && tag) {
                    removeCategory(card.id)(tag.id);
                    event.stopPropagation();
                  }
                }}
              >
                {card.categories.map(category => (
                  <li key={category}>
                    <Tag id={category}>
                      <button type='button' data-action='delete'>
                        <Icon id='xmark' />
                        <span class='sr-only'>Remove tag</span>
                      </button>
                    </Tag>
                  </li>
                ))}
              </ul>
            ) : null}
            <CollapseTags id={id.tags} card={card.id} />
          </header>
          <p
            {...contentEditable}
            onblur={event => {
              const description = (event.target as HTMLHeadingElement).innerText;
              if (card.description !== description) setDescription(props.id)(description);
            }}
          >
            {card.description ?? 'New description'}
          </p>
          <Tasklist id={card.id} />
        </article>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Card;
