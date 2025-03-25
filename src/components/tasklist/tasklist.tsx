import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Task from '../task/task';
import Icon from '../icon/icon';

import selector, {
  create,
  done,
  remove
} from './tasklist.state';

import './tasklist.scss';

export type TasklistProps = {
  id: string;
};

const Tasklist: Component<TasklistProps> = initial => {
  const component = new forgo.Component<TasklistProps>({
    render(props) {
      const tasks = selector.state(props.id);

      return (
        <div
          id={`tasklist-${props.id}`}
          class='tasklist'
          onclick={event => {
            const button = (event.target as HTMLElement | null)?.closest('button');
            const task = button?.closest<HTMLElement>('.task');

            if (button?.dataset.action === 'create') {
              create(props.id);
              event.stopPropagation();
            }

            if (task && button?.dataset.action === 'toggle') {
              done(task.id);
              event.stopPropagation();
            }

            if (task && button?.dataset.action === 'delete') {
              remove(task.id);
              event.stopPropagation();
            }
          }}
        >
          {tasks.length > 0 ? (
            <ol class="unstyled">
              {tasks.map(task => (
                <li key={task}>
                  <Task id={task} />
                </li>
              ))}
            </ol>
          ) : null}
          <button type='button' data-action='create'>
            <Icon id='plus' />
            <span>Add task</span>
          </button>
        </div>
      );
    }
  });

  selector.subscribe(initial.id)(component);

  return component;
};

export default Tasklist;
