import * as actionTypes from '../actionTypes';

const initState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        tokenId: action.tokenId,
        userId: action.userId,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.errorMessage,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        tokenId: null,
        userId: null,
        authRedirectPath: '/signin'
      };
    case actionTypes.AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_REDIRECT_PATH:
      return {
        ...state,
        loading: false,
        error: null,
        authRedirectPath: action.path
      };
    default:
      return state;
  }
};

export default authReducer;
