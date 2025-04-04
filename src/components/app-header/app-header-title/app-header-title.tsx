import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import contentEditable from '../../../lib/contentEditable/contentEditable';

import selector from './app-header-title.state';
import * as actions from './app-header-title.actions';

export type AppHeaderTitle = {
  id: string;
};

const AppHeaderTitle: Component<AppHeaderTitle> = initial => {
  const component = new forgo.Component<AppHeaderTitle>({
    render(props) {
      const state = selector.state();

      return (
        <h1
          {...contentEditable}
          onblur={event => {
            const title = (event.target as HTMLHeadingElement).innerText;
            if (title !== state) actions.title(props.id)(title);
          }}
        >
          {state}
        </h1>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default AppHeaderTitle;
