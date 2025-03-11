import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import contentEditable from '../../../../lib/contentEditable/contentEditable';

import selector, { setTitle } from './board.state';

export type BoardTitleProps = {};

const BoardTitle: Component<BoardTitleProps> = () => {
  const component = new forgo.Component<BoardTitleProps>({
    render() {
      const state = selector.state();

      return (
        <h1
          {...contentEditable}
          onblur={event => {
            const title = (event.target as HTMLHeadingElement).innerText;

            if (
              typeof state.id === 'string' &&
              title !== state.title
            ) setTitle(state.id, title);
          }}
        >
          {state.title}
        </h1>
      );
    }
  });

  selector.subscribe()(component);

  return component;
};

export default BoardTitle;
