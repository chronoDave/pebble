import test from 'tape';

import dom from '../../../test/dom';

import * as fixture from './grid.fixture';
import * as actions from './grid.actions';

test('[grid.column] sets focus on column relative to current column', t => {
  const { root } = dom(fixture);

  actions.column(1)(root);
  t.true(root.querySelector('[aria-colindex="2"] [tabindex="0"]'), 'sets focus on 2nd column');
  actions.column(-1)(root);
  t.true(root.querySelector('[aria-colindex="1"] [tabindex="0"]'), 'sets focus on 1st column');
  actions.column(-1)(root);
  t.true(root.querySelector('[aria-colindex="1"] [tabindex="0"]'), 'clamps backwards');
  actions.column(3)(root);
  t.true(root.querySelector('[aria-colindex="2"] [tabindex="0"]'), 'clamps forwards');

  t.end();
});

test('[grid.row] sets focus on row relative to current column', t => {
  const { root } = dom(fixture);

  actions.row(2)(root);
  t.true(root.querySelector('[aria-rowindex="3"] [tabindex="0"]'), 'sets focus on 3rd row');
  actions.row(-2)(root);
  t.true(root.querySelector('[aria-rowindex="1"] [tabindex="0"]'), 'sets focus on 1st row');
  actions.row(-1)(root);
  t.true(root.querySelector('[aria-rowindex="1"] [tabindex="0"]'), 'clamps backwards');
  actions.row(4)(root);
  t.true(root.querySelector('[aria-rowindex="3"] [tabindex="0"]'), 'clamps forwards');

  t.end();
});

test('[grid.first] sets focus on first row', t => {
  const { root } = dom(fixture);

  actions.row(1)(root);
  actions.first(root);
  t.true(root.querySelector('[aria-rowindex="1"] [tabindex="0"]'), 'sets focus on first row');

  t.end();
});

test('[grid.last] sets focus on last row', t => {
  const { root } = dom(fixture);

  actions.row(1)(root);
  actions.last(root);
  t.true(root.querySelector('[aria-rowindex="3"] [tabindex="0"]'), 'sets focus on first row');

  t.end();
});
