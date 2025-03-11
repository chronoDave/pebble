import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Board from '../board/board';
import Drawer from '../drawer/drawer';
import Header from './header/header';
import selector from './app.state';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      const board = selector.state();

      return [
        <Header />,
        typeof board === 'string' ? (
          <main class='app'>
            <Board id={board} />
          </main>
        ) : null,
        <Drawer />
      ];
    }
  });

  selector.subscribe()(component);

  return component;
};

export default App;
