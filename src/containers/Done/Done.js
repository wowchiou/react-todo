import React, { useState, useEffect } from 'react';
import styles from './Done.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { ajaxBaseUrl as axios } from '../../shared/service';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Layout from '../../components/Layout/Layout';
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
    onDeleted: (id, list) => dispatch(actions.onDeleted(id, list)),
    onCanceled: (id, list) => dispatch(actions.onCanceled(id, list)),
    clearError: () => dispatch(actions.clearError())
  };
};

const Done = props => {
  const {
    todoList,
    loading,
    error,
    fetchTodoList,
    onDeleted,
    onCanceled,
    clearError
  } = props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Done, axios));
