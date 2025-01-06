import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../../components/icon/icon';
import portal from '../../../components/portal/portal';
import store from '../../../store/store';

import DeleteBoard from './delete-board/delete-board';
import SelectBoard from './select-board/select-board';
import ModalInfo from './modal-info/modal-info';
import selectImage from '../../../lib/input/image';

import selector, { openDrawer } from './header.state';
import BoardTitle from './board-title/board-title';
import contentEditable from '../../../lib/contentEditable/contentEditable';
import { setBackground } from '../../board/board.state';

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
            <button type='button' onclick={() => portal(<ModalInfo />)}>
              <Icon id='circleInfo' />
              <span class='sr-only'>Open info modal</span>
            </button>
            {/* <button type='button' onclick={() => {
              try {
                void navigator.clipboard.writeText(compressToEncodedURIComponent(JSON.stringify(store.current)));
              } catch (err) {
                console.error(err);
              }
            }}>
              <Icon id='share' />
              <span class='sr-only'>Share</span>
            </button> */}
          </div>
        </header>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default Header;
