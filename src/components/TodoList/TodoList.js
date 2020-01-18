import React from 'react';
import styles from './TodoList.module.scss';

import TodoItem from './TodoItem/TodoItem';

const TodoList = props => {
  let _list = <li className={styles.nothing}>目前無代辦事項</li>;

  if (props.list) {
    _list = Object.keys(props.list).map(itm => {
      if (!props.list[itm].isDone) {
        return (
          <TodoItem
            itemId={itm}
            key={itm}
            item={props.list[itm].item}
            onFinished={props.onFinished}
            onDeleted={props.onDeleted}
          />
        );
      }
    });
  }

  return <ul className={styles.TodoList}>{_list}</ul>;
};

export default TodoList;
