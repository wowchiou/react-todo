import React from 'react';
import styles from './TodoItem.module.scss';

import Button from '../../../UI/Button/Button';

const TodoItem = props => {
  let isDoneButton;
  if (props.done) {
    isDoneButton = (
      <Button
        clicked={() => {
          props.onCanceled(props.itemId);
        }}
      >
        取消
      </Button>
    );
  } else {
    isDoneButton = (
      <Button
        clicked={() => {
          props.onFinished(props.itemId);
        }}
      >
        完成
      </Button>
    );
  }

  return (
    <li className={styles.TodoItem}>
      <p>{props.item}</p>
      <div className={styles.btns}>
        {isDoneButton}
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
