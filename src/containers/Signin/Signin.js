import React, { useState } from 'react';
import styles from './Signin.module.scss';
import axios from 'axios';
import { updateOBJ, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Loading from '../../UI/Loading/Loading';
import SignForm from '../../components/SignForm/SignForm';

const Signin = props => {
  const {
    isLogIn,
    loading,
    error,
    onLogin,
    clearAuthError,
    authRedirectPath
  } = props;

  const [signInFormData, setSignInFormData] = useState({
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

  const changeHandler = (e, type) => {
    const val = e.currentTarget.value;
    setSignInFormData(prevState => {
      const updatedData = updateOBJ(prevState[type], {
        value: val,
        valid: checkValidity(val, prevState[type].validRules),
        touch: true
      });
      return updateOBJ(prevState, { [type]: updatedData });
    });
  };

  return (
    <div className={styles.Signin}>
      {isLogIn && <Redirect to={authRedirectPath} />}

      {error && (
        <Modal show clicked={clearAuthError}>
          {error}
        </Modal>
      )}

      <div className={styles.wrap}>
        <Card className={styles.card}>
          <div className={styles.title}>
            <span>登入</span>
            <div className={styles.loading}>{loading && <Loading />}</div>
          </div>
          <div>
            <SignForm data={signInFormData} changed={changeHandler} />
          </div>
          <div className={styles.btns}>
            <Button clicked={() => onLogin(signInFormData)}>送出</Button>
            <Button clicked={() => props.history.push('/signup')}>註冊</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLogIn: state.auth.tokenId !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPAth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => dispatch(actions.onLogin(data)),
    clearAuthError: () => dispatch(actions.clearAuthError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Signin, axios));
