import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import image from '../../../lib/input/image';
import Icon from '../../icon/icon';
import store from '../../../store/store';

import selector from './app-header-background.state';
import * as actions from './app-header-background.actions';

export type AppHeaderBackgroundProps = {
  id: string;
};

const AppHeaderBackground: Component<AppHeaderBackgroundProps> = initial => {
  const component = new forgo.Component<AppHeaderBackgroundProps>({
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

export default AppHeaderBackground;
