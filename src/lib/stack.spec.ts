import test from 'node:test';
import assert from 'node:assert/strict';

import Stack from './stack.ts';

test('[stack.push] adds to stack', () => {
  const stack = new Stack(2);

  stack.push(1);
  assert.equal(stack.size, 1, 'adds to stack');
  assert.equal(stack.peek(), 1, 'increments index');

  stack.push(2);
  assert.equal(stack.size, 2, 'adds to stack');
  assert.equal(stack.peek(), 2, 'increments index');
  assert.equal(stack.peek(-1), 1, 'returns previous state');
});

test('[stack.push] loops when max size is exceeded', () => {
  const stack = new Stack(2);

  stack
    .push(1)
    .push(2)
    .push(3);

  assert.deepEqual(stack.peek(), 3, 'adds to stack');
  assert.equal(stack.size, 2, 'does not exceed max size');
  assert.deepEqual(stack.peek(-1), 2, 'wraps');
});

test('[stack.pop] removes from stack', () => {
  const stack = new Stack(2);

  stack
    .push(1)
    .pop();

  assert.equal(stack.size, 0, 'removes from stack');
  assert.equal(stack.peek(), null, 'removes from stack');
});

test('[stack.size] returns stack size', () => {
  const stack = new Stack(1);

  assert.equal(stack.size, 0, 'empty stack');

  stack.push(1);
  assert.equal(stack.size, 1, 'pushed stack');

  stack.pop();
  assert.equal(stack.size, 0, 'popped stack');

  stack.push(1).push(2);
  assert.equal(stack.size, 1, 'pushed wrapped stack');

  stack.pop();
  assert.equal(stack.size, 0, 'popped wrapped stack');
});
