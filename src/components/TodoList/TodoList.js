import React from 'react';
import styles from './TodoList.module.scss';
import TodoItem from './TodoItem/TodoItem';

const TodoList = props => {
  const { list, done, onCanceled, onFinished, onDeleted } = props;

  const defaultTag = <li className={styles.nothing}>目前無代辦事項</li>;
  let listTag = defaultTag;

  if (list) {
    listTag = Object.keys(list).map(itm => {
      let todoItem = false;
      if (list[itm].isDone === done) {
        todoItem = (
          <TodoItem
            key={itm}
            item={list[itm].item}
            onFinished={() => onFinished(itm, list)}
            onDeleted={() => onDeleted(itm, list)}
            onCanceled={() => onCanceled(itm, list)}
            done={done}
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
