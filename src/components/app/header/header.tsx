import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../icon/icon';
import store from '../../../store/store';

import selectImage from '../../../lib/input/image';
import download from '../../../lib/input/download';

import DeleteBoard from './delete-board/delete-board';
import BoardTitle from './board-title/board-title';
import selector, { openDrawer, setBackground } from './header.state';

import './header.scss';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      const id = selector.state();

      return (
        <header>
          <div>
            <button type="button" onclick={openDrawer}>
              <Icon id='bars' />
              <span class='sr-only'>
                Open board drawer
              </span>
            </button>
            <BoardTitle />
            {typeof id === 'string' && (
              <button
                type='button'
                onclick={() => {
                  void selectImage().then(setBackground(id));
                }}
              >
                <span class='sr-only'>Add background image</span>
                <Icon id='imagePlus' />
              </button>
            )}
            {typeof id === 'string' ? (
              <button type='button' onclick={() => setBackground(id)(null)}>
                <span class='sr-only'>Remove background image</span>
                <Icon id='imageRemove' />
              </button>
            ) : null}
            <DeleteBoard />
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

export default Header;
