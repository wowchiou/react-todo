import React, { useState, useReducer, useCallback } from 'react';
import styles from './Signin.module.scss';

import axios from 'axios';
import { signinInstance } from '../../axios-instence';

import { updateOBJ, checkValidity } from '../../shared/utility';
import { httpReducer } from '../../shared/reducer';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Loading from '../../UI/Loading/Loading';

import SignForm from '../../components/SignForm/SignForm';

const Signin = props => {
  console.log('SIGNIN');

  const [httpStatus, dispatchHttpStatus] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  const [signinFormData, setSigninFormData] = useState({
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
    }
  });

  const changeHandler = (ev, type) => {
    const val = ev.currentTarget.value;
    setSigninFormData(prevState => {
      const updatedData = updateOBJ(prevState[type], {
        value: val,
        valid: checkValidity(val, prevState[type].validRules),
        touch: true
      });
      return updateOBJ(prevState, { [type]: updatedData });
    });
  };

  const signinHandler = async formData => {
    dispatchHttpStatus({ type: 'SEND' });

    if (!checkIsFormOk(formData)) {
      dispatchHttpStatus({
        type: 'ERROR',
        errorMessage: '填入資料不正確,請檢查後再發送'
      });
      return;
    }

    const data = getFormValue(formData);

    const signinResponse = await signinInstance(data);

    if (signinResponse) {
      if (signinOk(signinResponse)) {
        login(signinResponse.data.idToken);
      } else {
        dispatchHttpStatus({
          type: 'ERROR',
          errorMessage: '登入失敗'
        });
      }
    }

    dispatchHttpStatus({ type: 'RESPONSE' });

    function getFormValue(formList) {
      const result = Object.keys(formList)
        .map(itm => {
          return { [itm]: formList[itm].value };
        })
        .reduce((obj, el) => {
          return { ...obj, ...el };
        }, {});
      return result;
    }

    function signinOk(res) {
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

    function login(token) {
      localStorage.setItem('idToken', token);
      props.history.push('/');
    }
  };

  const clearModal = useCallback(() => {
    dispatchHttpStatus({ type: 'CLEAR' });
  }, []);

  return (
    <div className={styles.Signin}>
      {httpStatus.error && (
        <Modal show clicked={clearModal}>
          {httpStatus.error}
        </Modal>
      )}
      <div className={styles.wrap}>
        <Card className={styles.card}>
          <div className={styles.title}>
            <span>登入</span>
            <div className={styles.loading}>
              {httpStatus.loading && <Loading />}
            </div>
          </div>
          <div>
            <SignForm data={signinFormData} changed={changeHandler} />
          </div>
          <div className={styles.btns}>
            <Button clicked={() => signinHandler(signinFormData)}>送出</Button>
            <Button clicked={() => props.history.push('/signup')}>註冊</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withErrorHandler(Signin, axios);
