import React from 'react';
import styles from './TodoList.module.scss';

import TodoItem from './TodoItem/TodoItem';

const TodoList = props => {
  const defaultTag = <li className={styles.nothing}>目前無代辦事項</li>;
  let listTag = defaultTag;

  if (props.list) {
    listTag = Object.keys(props.list).map(itm => {
      let todoItem = false;
      if (props.list[itm].isDone === props.done) {
        todoItem = (
          <TodoItem
            itemId={itm}
            key={itm}
            item={props.list[itm].item}
            onFinished={props.onFinished}
            onDeleted={props.onDeleted}
            onCanceled={props.onCanceled}
            done={props.done}
          />
        );
      }
      return todoItem;
    });

    // 如果list無資料顯示預設文字
    const listTagLength = listTag.filter(itm => itm).length;
    if (listTagLength === 0) {
      listTag = defaultTag;
    }
  }

  return <ul className={styles.TodoList}>{listTag}</ul>;
};

export default TodoList;
