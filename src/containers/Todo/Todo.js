import React, { useState, useEffect } from 'react';
import styles from './Todo.module.scss';
import {
  ajaxBaseUrl as axios,
  ajaxGetTodoList,
  ajaxAddTodoItem,
  ajaxUpdateTodoItemDone,
  ajaxDeleteTodoItem
} from '../../shared/service';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../components/Layout/Layout';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import TodoList from '../../components/TodoList/TodoList';
import Loading from '../../UI/Loading/Loading';

const Todo = () => {
  const [addTodoItem, setAddTodoItem] = useState('');
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeAddItemHandler = e => {
    setAddTodoItem(e.target.value);
  };

  const addTodoItemHandler = async () => {
    try {
      setLoading(true);
      const todoItem = {
        item: addTodoItem,
        isDone: false
      };
      const res = await ajaxAddTodoItem(todoItem);
      setTodoList(prevState => {
        return {
          ...prevState,
          [res.data.name]: {
            ...todoItem
          }
        };
      });
      setAddTodoItem('');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onFinished = async id => {
    try {
      setLoading(true);
      const _todoList = todoList;
      const updateValue = Object.keys(_todoList)
        .map(itm => {
          if (itm === id) return _todoList[itm];
        })
        .reduce((obj, el) => {
          return {
            ...obj,
            ...el,
            isDone: true
          };
        }, {});
      await ajaxUpdateTodoItemDone(id, updateValue);
      setTodoList(prevState => {
        return {
          ...prevState,
          [id]: {
            ...updateValue
          }
        };
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onDeleted = async id => {
    try {
      setLoading(true);
      await ajaxDeleteTodoItem(id);
      const updateList = Object.keys(todoList)
        .map(itm => {
          if (itm !== id) return { [itm]: { ...todoList[itm] } };
        })
        .reduce((obj, el) => {
          return {
            ...obj,
            ...el
          };
        }, {});
      setTodoList({ ...updateList });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const res = await ajaxGetTodoList();
      setTodoList(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

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

        <h2 className={styles.title}>
          待完成項目
          <div className={styles.loading}>{loading && <Loading />}</div>
        </h2>
        <TodoList
          list={todoList}
          onFinished={onFinished}
          onDeleted={onDeleted}
          done={false}
        />
      </div>
    </Layout>
  );
};

export default withErrorHandler(Todo, axios);
