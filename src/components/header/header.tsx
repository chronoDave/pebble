import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import download from '../../lib/input/download';
import Icon from '../icon/icon';
import { getElementById } from '../../lib/dom';

import HeaderTitle from './header-title/header-title';
import HeaderBackground from './header-background/header-background';

import './header.scss';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      return (
        <header>
          <div>
            <button
              type="button"
              onclick={() => getElementById<HTMLDialogElement>('drawer')?.showModal()}
              aria-haspopup="dialog"
            >
              <Icon id='bars' />
              <span class='sr-only'>Open board navigation</span>
            </button>
            <HeaderTitle />
            <HeaderBackground />
          </div>
          <div>
            <button type='button' onclick={() => window.store.undo()}>
              <Icon id='rotateLeft' />
              <span class='sr-only'>Undo</span>
            </button>
            <button type='button' onclick={() => download({ name: 'data.json', data: JSON.stringify(window.store.current) })}>
              <Icon id='download' />
              <span class='sr-only'>Download data</span>
            </button>
          </div>
        </header>
      );
    }
  });

  return component;
};

export default Header;
