import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Task from '../task/task';
import Icon from '../../components/icon/icon';

import selector, {
  createTask,
  toggleTaskDone,
  removeTask
} from './tasklist.state';

import './tasklist.scss';

export type TasklistProps = {
  id: string;
};

const Tasklist: Component<TasklistProps> = initial => {
  const component = new forgo.Component<TasklistProps>({
    render(props) {
      const card = selector.state(props.id);

      if (!card || card.tasks.length === 0) return null;
      return (
        <div
          id={`tasklist-${card.id}`}
          class='tasklist'
          onclick={event => {
            const button = (event.target as HTMLElement | null)?.closest('button');
            const task = button?.closest<HTMLElement>('.task');

            if (button?.dataset.action === 'create') {
              createTask(card.id);
              event.stopPropagation();
            }

            if (task && button?.dataset.action === 'toggle') {
              toggleTaskDone(task.id);
              event.stopPropagation();
            }

            if (task && button?.dataset.action === 'delete') {
              removeTask(card.id)(task.id);
              event.stopPropagation();
            }
          }}
        >
          <ol class="unstyled">
            {card.tasks.map(task => (
              <li key={task}>
                <Task id={task} />
              </li>
            ))}
          </ol>
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
