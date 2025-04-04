import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import contentEditable from '../../../lib/contentEditable/contentEditable';

import selector from './header-title.state';
import * as actions from './header-title.actions';

export type HeaderTitle = {
  id: string;
};

const HeaderTitle: Component<HeaderTitle> = initial => {
  const component = new forgo.Component<HeaderTitle>({
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

export default HeaderTitle;
