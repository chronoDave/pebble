import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import image from '../../../lib/input/image';
import Icon from '../../icon/icon';
import store from '../../../store/store';

import selector from './header-background.state';
import * as actions from './header-background.actions';

export type HeaderBackgroundProps = {};

const HeaderBackground: Component<HeaderBackgroundProps> = () => {
  const component = new forgo.Component<HeaderBackgroundProps>({
    render() {
      const bg = selector.state();

      return (
        <button
          type='button'
          onclick={void (async () => {
            if (typeof bg === 'string') return store.set(produce(actions.background()));
            return store.set(produce(actions.background(await image() ?? undefined)));
          })}
        >
          <span class='sr-only'>{bg === null ? 'Add' : 'remove'} background image</span>
          <Icon id={bg === null ? 'imagePlus' : 'imageRemove'} />
        </button>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default HeaderBackground;
