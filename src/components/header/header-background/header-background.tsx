import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import image from '../../../lib/input/image';
import Icon from '../../icon/icon';
import store from '../../../store/store';

import selector from './header-background.state';
import * as actions from './header-background.actions';

export type HeaderBackgroundProps = {
  id: string;
};

const HeaderBackground: Component<HeaderBackgroundProps> = initial => {
  const component = new forgo.Component<HeaderBackgroundProps>({
    render(props) {
      const bg = selector.state(props.id);

      return (
        <button
          type='button'
          onclick={void (async () => {
            if (typeof bg === 'string') return store.set(produce(actions.background(props.id)()));
            return store.set(produce(actions.background(props.id)(await image() ?? undefined)));
          })}
        >
          <span class='sr-only'>{bg === null ? 'Add' : 'remove'} background image</span>
          <Icon id={bg === null ? 'imagePlus' : 'imageRemove'} />
        </button>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default HeaderBackground;
