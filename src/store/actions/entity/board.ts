import uid from '../../../lib/string/uid';
import actions from './entity';

const entity = actions('board');

export const { set, remove } = entity;
export const create = entity.set({ id: uid(), title: 'New board' });
export const title = entity.string('title');
export const background = entity.string('background');
