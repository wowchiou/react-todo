import React from 'react';
import styles from './TodoItem.module.scss';

import Button from '../../../UI/Button/Button';

const TodoItem = props => {
  return (
    <li className={styles.TodoItem}>
      <p>{props.item}</p>
      <div className={styles.btns}>
        <Button
          clicked={() => {
            props.onFinished(props.itemId);
          }}
        >
          完成
        </Button>
        <Button
          clicked={() => {
            props.onDeleted(props.itemId);
          }}
        >
          刪除
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
