import React from 'react';
import styles from './TodoItem.module.scss';
import Button from '../../../UI/Button/Button';

const TodoItem = props => {
  const { item, done, onCanceled, onFinished, onDeleted } = props;
  let isDoneButton;
  if (done) {
    isDoneButton = <Button clicked={onCanceled}>取消</Button>;
  } else {
    isDoneButton = <Button clicked={onFinished}>完成</Button>;
  }

  return (
    <li className={styles.TodoItem}>
      <p>{item}</p>
      <div className={styles.btns}>
        {isDoneButton}
        <Button clicked={onDeleted}>刪除</Button>
      </div>
    </li>
  );
};

export default TodoItem;
