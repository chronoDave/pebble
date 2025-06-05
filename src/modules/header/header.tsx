import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';

import './header.scss';
import { showDialog } from '../../lib/dom';

export type HeaderProps = {};

const Header: Component<HeaderProps> = () => {
  const component = new forgo.Component<HeaderProps>({
    render() {
      return (
        <header>
          <h1>Pebble</h1>
          <button
            type='button'
            aria-haspopup='dialog'
            class='icon'
            onclick={() => showDialog('navigation')}
          >
            <Icon id='bars' />
            <span class='sr-only'>Navigation</span>
          </button>
        </header>
      );
    }
  });

  return component;
};

export default Header;
