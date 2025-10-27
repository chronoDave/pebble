import h from '@chronocide/hyper';

import store from '../../state/store.ts';
import * as selector from '../../state/selector.ts';

export default (id: string) => {
  const card = selector.card(store.state)(id);
  if (!card) throw new Error(`Invalid card id: ${id}`);

  return h('article')({ id, class: 'card' })(
    h('h4')()(card.title)
  );
};
