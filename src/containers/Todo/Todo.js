import React, { useState } from 'react';
import styles from './Todo.module.scss';
import { todoInstence as axios } from '../../axios-instence';

// import withErrorHandler from '../../hoc/withErrorHandler';
import Layout from '../../components/Layout/Layout';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const Todo = props => {
  console.log('Todo');
  const [addTodoItem, setAddTodoItem] = useState('');

  const changeAddItemHandler = e => {
    setAddTodoItem(e.target.value);
  };

  const addTodoItemHandler = () => {
    axios
      .post('/todo/wowchiou', {
        item: addTodoItem
      })
      .then(res => {
        console.log(res);
      });
  };

  return (
    <Layout>
      <div className={styles.Todo}>
        <h2 className={styles.title}>新增項目</h2>
        <div className={styles.addBar}>
          <Input
            type="input"
            inputType="text"
            name="add-todo"
            value={addTodoItem}
            changed={changeAddItemHandler}
            config={{ placeholder: '請輸入新增項目' }}
          />
          <Button clicked={addTodoItemHandler}>ADD</Button>
        </div>
        <h2 className={styles.title}>待完成項目</h2>
        <div className={styles.items}>待完成項目</div>
      </div>
    </Layout>
  );
};

export default Todo;
