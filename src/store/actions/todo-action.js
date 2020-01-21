import * as actionTypes from '../actionTypes';
import {
  ajaxAddTodoItem,
  ajaxDeleteTodoItem,
  ajaxGetTodoList,
  ajaxUpdateTodoItemDone
} from '../../shared/service';

export const todoActions = {
  start: () => {
    return {
      type: actionTypes.TODO_START
    };
  },
  fail: errorMessage => {
    return {
      type: actionTypes.TODO_FAIL,
      errorMessage: errorMessage
    };
  },
  updateItem: (id, item) => {
    return {
      type: actionTypes.TODO_UPDATE_ITEM,
      id: id,
      item: item
    };
  },
  updateList: list => {
    return {
      type: actionTypes.TODO_UPDATE_LIST,
      list: list
    };
  },
  clearError: () => {
    return {
      type: actionTypes.TODO_CLEAR_ERROR
    };
  }
};

export const onAdded = listItem => {
  return async dispatch => {
    if (listItem.trim() === '') return;
    try {
      dispatch(todoActions.start());
      const todoItem = {
        item: listItem,
        isDone: false
      };
      const res = await ajaxAddTodoItem(todoItem);
      const id = res.data.name;
      dispatch(todoActions.updateItem(id, todoItem));
    } catch (error) {
      console.log(error);
      dispatch(todoActions.fail('新增項目發生錯誤'));
    }
  };
};

export const onFinished = (id, list) => {
  return async dispatch => {
    try {
      dispatch(todoActions.start());
      const updateValue = Object.keys(list)
        .map(itm => {
          if (itm === id) return list[itm];
        })
        .reduce((obj, el) => {
          return {
            ...obj,
            ...el,
            isDone: true
          };
        }, {});
      await ajaxUpdateTodoItemDone(id, updateValue);
      dispatch(todoActions.updateItem(id, updateValue));
    } catch (error) {
      console.log(error);
      dispatch(todoActions.fail('更新項目發生錯誤'));
    }
  };
};

export const onDeleted = (id, list) => {
  return async dispatch => {
    try {
      dispatch(todoActions.start());
      await ajaxDeleteTodoItem(id);
      const updateList = Object.keys(list)
        .map(itm => {
          if (itm !== id) return { [itm]: { ...list[itm] } };
        })
        .reduce((obj, el) => {
          return {
            ...obj,
            ...el
          };
        }, {});
      dispatch(todoActions.updateList(updateList));
    } catch (error) {
      console.log(error);
      dispatch(todoActions.fail('刪除項目發生錯誤'));
    }
  };
};

export const onCanceled = (id, list) => {
  return async dispatch => {
    try {
      dispatch(todoActions.start());
      const updateList = Object.keys(list)
        .map(itm => {
          if (itm === id) return list[itm];
        })
        .reduce((obj, el) => {
          return {
            ...obj,
            ...el,
            isDone: false
          };
        }, {});
      await ajaxUpdateTodoItemDone(id, updateList);
      dispatch(todoActions.updateList(updateList));
    } catch (error) {
      console.log(error);
      dispatch(todoActions.fail('更新項目發生錯誤'));
    }
  };
};

export const fetchTodoList = () => {
  return async dispatch => {
    try {
      dispatch(todoActions.start());
      const res = await ajaxGetTodoList();
      const list = res.data;
      dispatch(todoActions.updateList(list));
    } catch (error) {
      console.log(error);
      dispatch(todoActions.fail('讀取項目發生錯誤'));
    }
  };
};

export const clearError = () => {
  return dispatch => {
    dispatch(todoActions.clearError());
  };
};
