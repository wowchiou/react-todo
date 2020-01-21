import * as actionTypes from '../actionTypes';

const initState = {
  todoList: null,
  loading: false,
  error: null
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.TODO_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.TODO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.errorMessage
      };
    case actionTypes.TODO_UPDATE_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        todoList: {
          ...state.todoList,
          [action.id]: {
            ...action.item
          }
        }
      };
    case actionTypes.TODO_UPDATE_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        todoList: {
          ...action.list
        }
      };
    case actionTypes.TODO_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export default todoReducer;
