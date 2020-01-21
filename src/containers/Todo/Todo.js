import React, { useState, useEffect } from 'react';
import styles from './Todo.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { ajaxBaseUrl as axios } from '../../shared/service';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../components/Layout/Layout';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import TodoList from '../../components/TodoList/TodoList';
import Loading from '../../UI/Loading/Loading';
import Modal from '../../UI/Modal/Modal';

const mapStateToProps = state => {
  return {
    todoList: state.todo.todoList,
    loading: state.todo.loading,
    error: state.todo.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodoList: () => dispatch(actions.fetchTodoList()),
    onAdded: item => dispatch(actions.onAdded(item)),
    onFinished: (id, list) => dispatch(actions.onFinished(id, list)),
    onDeleted: (id, list) => dispatch(actions.onDeleted(id, list)),
    clearError: () => dispatch(actions.clearError())
  };
};

const Todo = props => {
  const {
    todoList,
    loading,
    error,
    fetchTodoList,
    onAdded,
    onDeleted,
    onFinished,
    clearError
  } = props;

  const [addTodoItem, setAddTodoItem] = useState('');

  const changeAddItemHandler = e => {
    setAddTodoItem(e.target.value);
  };

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  return (
    <Layout>
      {error && (
        <Modal show clicked={clearError}>
          {error}
        </Modal>
      )}
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
          <Button clicked={() => onAdded(addTodoItem)}>ADD</Button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Todo, axios));
