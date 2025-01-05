import * as forgo from 'forgo';

import initDom from '../../../test/dom';

export default () => {
  initDom();

  forgo.mount((
    <div class="anchor">
      Anchor
    </div>
  ), document.body);

  return () => forgo.unmount(document.body);
};
