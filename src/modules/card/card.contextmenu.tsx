import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Contextmenu from '../../components/contextmenu/contextmenu';
import Icon from '../../components/icon/icon';

export type ContextmenuCardProps = {
  id: string;
};

const ContextmenuCard: Component<ContextmenuCardProps> = () => {
  const component = new forgo.Component<ContextmenuCardProps>({
    render(props) {
      return (
        <Contextmenu id={props.id}>
          <ul class='unstyled'>
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
          </ul>
        </Contextmenu>
      );
    }
  });

  return component;
};

export default ContextmenuCard;
