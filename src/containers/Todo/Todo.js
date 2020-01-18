import React, { useState, useEffect, useCallback } from 'react';
import styles from './Todo.module.scss';
import { todoInstence as axios } from '../../axios-instence';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../components/Layout/Layout';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import TodoList from '../../components/TodoList/TodoList';
import Loading from '../../UI/Loading/Loading';

const Todo = props => {
  console.log('Todo');
  const [addTodoItem, setAddTodoItem] = useState('');
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeAddItemHandler = e => {
    setAddTodoItem(e.target.value);
  };

  const addTodoItemHandler = () => {
    setLoading(true);
    const todoItem = {
      item: addTodoItem,
      isDone: false
    };

    axios.post('/todo/wowchiou.json', todoItem).then(res => {
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
    });
  };

  const onFinished = id => {
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

    axios.put(`/todo/wowchiou/${id}.json`, updateValue).then(res => {
      setTodoList(prevState => {
        return {
          ...prevState,
          [id]: {
            ...updateValue
          }
        };
      });
      setLoading(false);
    });
  };

  const onDeleted = id => {
    setLoading(true);
    axios.delete(`/todo/wowchiou/${id}.json`).then(res => {
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
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get('/todo/wowchiou.json').then(res => {
      setTodoList(res.data);
      setLoading(false);
    });
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
        />
      </div>
    </Layout>
  );
};

export default withErrorHandler(Todo, axios);
