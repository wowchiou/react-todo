import React, { useState, useReducer, useCallback } from 'react';
import styles from './Signup.module.scss';

import axios from 'axios';
import { ajaxSignUp } from '../../shared/service';

import { updateOBJ, checkValidity } from '../../shared/utility';
import { httpReducer } from '../../shared/reducer';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Loading from '../../UI/Loading/Loading';

import SignForm from '../../components/SignForm/SignForm';

const Signup = props => {
  const [httpStatus, dispatchHttpStatus] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  const [signupFormData, setSignupFormData] = useState({
    email: {
      type: 'input',
      inputType: 'email',
      config: {
        placeholder: 'email address'
      },
      value: '',
      validRules: {
        required: true,
        isEmail: true
      },
      valid: false,
      touch: false
    },
    password: {
      type: 'input',
      inputType: 'password',
      config: {
        placeholder: 'password'
      },
      value: '',
      validRules: {
        required: true,
        minLength: 6
      },
      valid: false,
      touch: false
    },
    comfirnPsw: {
      type: 'input',
      inputType: 'password',
      config: {
        placeholder: 'comfirn password'
      },
      value: '',
      validRules: {
        required: true,
        minLength: 6
      },
      valid: false,
      touch: false
    }
  });

  const changeHandler = useCallback((ev, type) => {
    const val = ev.currentTarget.value;
    setSignupFormData(prevState => {
      const updatedData = updateOBJ(prevState[type], {
        value: val,
        valid: checkValidity(val, prevState[type].validRules),
        touch: true
      });
      return updateOBJ(prevState, { [type]: updatedData });
    });
  }, []);

  const signupHandler = useCallback(
    async formData => {
      dispatchHttpStatus({ type: 'SEND' });

      if (!checkIsFormOk(formData)) {
        dispatchHttpStatus({
          type: 'ERROR',
          errorMessage: '填入資料不正確,請檢查後再發送'
        });
        return;
      }

      if (!passwordHasSameValue(formData)) {
        dispatchHttpStatus({
          type: 'ERROR',
          errorMessage: '密碼不一致,請重新輸入後再發送'
        });
        return;
      }

      const data = getFormValue(formData);

      const signupResponse = await ajaxSignUp(data);

      if (signupResponse) {
        if (signupOk(signupResponse)) {
          props.history.push('/signin');
        } else {
          dispatchHttpStatus({ type: 'ERROR', errorMessage: '寫入資料失敗' });
          console.log(signupResponse);
        }
      }

      dispatchHttpStatus({ type: 'RESPONSE' });

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

      function signupOk(res) {
        return res.status === '200' || res.status === 200;
      }

      function checkIsFormOk(data) {
        let result = false;
        const validData = Object.keys(data).filter(
          itm => data[itm].valid === false
        );
        if (validData.length === 0) {
          result = true;
        }

        return result;
      }

      function passwordHasSameValue(data) {
        return data.password.value === data.comfirnPsw.value;
      }
    },
    [props.history]
  );

  const clearModal = useCallback(() => {
    dispatchHttpStatus({ type: 'CLEAR' });
  }, []);

  return (
    <div className={styles.Signup}>
      {httpStatus.error && (
        <Modal show clicked={clearModal}>
          {httpStatus.error}
        </Modal>
      )}

      <div className={styles.wrap}>
        <Card className={styles.card}>
          <div className={styles.title}>
            <span>註冊</span>
            <div className={styles.loading}>
              {httpStatus.loading && <Loading />}
            </div>
          </div>
          <div>
            <SignForm data={signupFormData} changed={changeHandler} />
          </div>
          <div className={styles.btns}>
            <Button clicked={() => signupHandler(signupFormData)}>送出</Button>
            <Button clicked={() => props.history.push('/signin')}>登入</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withErrorHandler(Signup, axios);
