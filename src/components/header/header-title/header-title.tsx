import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import { produce } from 'immer';

import contentEditable from '../../../lib/contentEditable/contentEditable';

import selector from './header-title.state';
import * as actions from './header-title.actions';

export type HeaderTitle = {};

const HeaderTitle: Component<HeaderTitle> = () => {
  const component = new forgo.Component<HeaderTitle>({
    render() {
      const state = selector.state();

      return (
        <h1
          {...contentEditable}
          onblur={event => {
            const title = (event.target as HTMLHeadingElement).innerText;
            if (title !== state) window.store.set(produce(actions.title(title)));
          }}
        >
          {state}
        </h1>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default HeaderTitle;
