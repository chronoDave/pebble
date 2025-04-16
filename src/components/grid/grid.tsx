import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import * as actions from './grid.actions';

export type Row = {
  id: string;
  active?: boolean;
  columns: forgo.ForgoNode[];
};

export type GridProps = {
  id: string;
  rows: Row[];
};

const Grid: Component<GridProps> = () => {
  const component = new forgo.Component<GridProps>({
    render(props) {
      return (
        <div
          id={props.id}
          role='grid'
          aria-labelledby={`${props.id}-title`}
          aria-rowcount={props.rows.length}
          tabindex={-1}
          onkeydown={event => {
            if (event.key === 'ArrowUp') actions.row(-1)(event.currentTarget);
            if (event.key === 'ArrowDown') actions.row(1)(event.currentTarget);
            if (event.key === 'ArrowLeft') actions.column(-1)(event.currentTarget);
            if (event.key === 'ArrowRight') actions.column(1)(event.currentTarget);
            if (event.key === 'PageUp') actions.first(event.currentTarget);
            if (event.key === 'PageDown') actions.last(event.currentTarget);
          }}
        >
          {props.rows.length === 0 ?
            props.children :
            props.rows.map((row, i) => (
              <div
                id={row.id}
                key={row.id}
                role='row'
                aria-rowindex={i + 1}
                aria-colcount={row.columns.length}
                aria-selected={row.active}
              >
                {row.columns.map((column, j) => (
                  <div role='gridcell' aria-colindex={j + 1}>
                    {column}
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      );
    }
  });

  return component;
};

export default Grid;
