import React, { useState, useEffect } from 'react';
import styles from './Done.module.scss';
import {
  ajaxBaseUrl as axios,
  ajaxGetTodoList,
  ajaxUpdateTodoItemDone,
  ajaxDeleteTodoItem
} from '../../shared/service';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../components/Layout/Layout';
import TodoList from '../../components/TodoList/TodoList';
import Loading from '../../UI/Loading/Loading';

const Done = () => {
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCanceled = async id => {
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
            isDone: false
          };
        }, {});

      const res = await ajaxUpdateTodoItemDone(id, updateValue);
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
      const res = await ajaxDeleteTodoItem(id);
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
      <div className={styles.Done}>
        <h2 className={styles.title}>
          已完成項目
          <div className={styles.loading}>{loading && <Loading />}</div>
        </h2>
        <TodoList
          list={todoList}
          onCanceled={onCanceled}
          onDeleted={onDeleted}
          done={true}
        />
      </div>
    </Layout>
  );
};

export default withErrorHandler(Done, axios);
