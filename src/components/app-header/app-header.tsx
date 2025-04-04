import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import store from '../../store/store';
import download from '../../lib/input/download';
import Icon from '../icon/icon';

import AppHeaderTitle from './app-header-title/app-header-title';
import AppHeaderBackground from './app-header-background/app-header-background';
import * as actions from './app-header.actions';
import selector from './app-header.state';

import './app-header.scss';

export type AppHeaderProps = {};

const AppHeader: Component<AppHeaderProps> = () => {
  const component = new forgo.Component<AppHeaderProps>({
    render() {
      const id = selector.state();

      return (
        <header>
          <div>
            <button type="button" onclick={() => store.set(produce(actions.open))}>
              <Icon id='bars' />
              <span class='sr-only'>Open board drawer</span>
            </button>
            {typeof id === 'string' ? <AppHeaderTitle id={id} /> : null}
            {typeof id === 'string' ? <AppHeaderBackground id={id} /> : null}
            <button
              type='button'
              disabled={typeof id !== 'string'}
              onclick={() => {
                if (typeof id === 'string') store.set(produce(actions.remove(id)));
              }}
            >
              <span class='sr-only'>Remove active board</span>
              <Icon id='trash' />
            </button>
          </div>
          <div>
            <button type='button' onclick={() => store.undo()}>
              <Icon id='rotateLeft' />
              <span class='sr-only'>Undo</span>
            </button>
            <button type='button' onclick={() => download({ name: 'data.json', data: JSON.stringify(store.current) })}>
              <Icon id='download' />
              <span class='sr-only'>Download data</span>
            </button>
          </div>
        </header>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default AppHeader;
