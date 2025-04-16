import type { Row } from './grid';

import * as forgo from 'forgo';

import Grid from './grid';

const rows: Row[] = [{
  id: '1',
  columns: [
    <button type='button' tabindex={0}>
      1
    </button>,
    <button type='button' tabindex={-1}>
      2
    </button>
  ]
}, {
  id: '2',
  columns: [
    <button type='button' tabindex={-1}>
      1
    </button>,
    <button type='button' tabindex={-1}>
      2
    </button>
  ],
  active: true
}, {
  id: '3',
  columns: [
    <button type='button' tabindex={-1}>
      1
    </button>,
    <button type='button' tabindex={-1}>
      2
    </button>
  ]
}];

forgo.mount((
  <Grid id='fixture' rows={rows}>
    <p>No rows found</p>
  </Grid>
), document.body);
