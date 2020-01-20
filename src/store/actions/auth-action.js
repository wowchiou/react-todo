import { ajaxSignIn, ajaxSignUp } from '../../shared/service';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId: tokenId,
    userId: userId
  };
};

export const authFail = errorMessage => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage: errorMessage
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const clearAuthError = () => {
  return {
    type: actionTypes.AUTH_CLEAR_ERROR
  };
};

export const setAuthRedirectAuth = path => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path
  };
};

export const onLogin = formData => {
  return async dispatch => {
    dispatch(authStart());
    if (!checkIsFormOk(formData)) {
      return dispatch(authFail('填入資料不正確,請檢查後再發送'));
    }
    try {
      const data = getFormValue(formData);
      const response = await ajaxSignIn(data);
      if (response) {
        if (signOk(response)) {
          const tokenId = response.data.idToken;
          const userId = response.data.localId;

          localStorage.setItem('idToken', tokenId);
          localStorage.setItem('userId', userId);
          dispatch(setAuthRedirectAuth('/'));
          dispatch(authSuccess(tokenId, userId));
        }
      }
    } catch (error) {
      dispatch(authFail('登入失敗'));
    }
  };
};

export const onSignUp = formData => {
  return async dispatch => {
    dispatch(authStart());
    if (!checkIsFormOk(formData)) {
      return dispatch(authFail('填入資料不正確,請檢查後再發送'));
    }
    if (!passwordHasSameValue(formData)) {
      return dispatch(authFail('密碼不一致,請重新輸入後再發送'));
    }
    try {
      const data = getFormValue(formData);
      const signupResponse = await ajaxSignUp(data);
      if (signupResponse) {
        if (signOk(signupResponse)) {
          dispatch(setAuthRedirectAuth('/signin'));
        }
      }
    } catch (error) {
      return dispatch(authFail('寫入資料失敗'));
    }
  };
};

export const onLogOut = () => {
  return dispatch => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    dispatch(authLogout());
  };
};

function getFormValue(formList) {
  const result = Object.keys(formList)
    .map(itm => {
      if (itm === 'email' || itm === 'password') {
        return { [itm]: formList[itm].value };
      } else {
        return {};
      }
    })
    .reduce((obj, el) => {
      return { ...obj, ...el };
    }, {});
  return result;
}

function signOk(res) {
  return res.status === '200' || res.status === 200;
}

function checkIsFormOk(data) {
  let result = false;
  const validData = Object.keys(data).filter(itm => data[itm].valid === false);
  if (validData.length === 0) {
    result = true;
  }
  return result;
}

function passwordHasSameValue(data) {
  return data.password.value === data.comfirnPsw.value;
}
