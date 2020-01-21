import React, { useState } from 'react';
import styles from './Signup.module.scss';
import axios from 'axios';
import { updateOBJ, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Loading from '../../UI/Loading/Loading';
import SignForm from '../../components/SignForm/SignForm';

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: data => dispatch(actions.onSignUp(data)),
    clearAuthError: () => dispatch(actions.clearAuthError())
  };
};

const Signup = props => {
  const { loading, error, clearAuthError, onSignUp, authRedirectPath } = props;

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

  const changeHandler = (ev, type) => {
    const val = ev.currentTarget.value;
    setSignupFormData(prevState => {
      const updatedData = updateOBJ(prevState[type], {
        value: val,
        valid: checkValidity(val, prevState[type].validRules),
        touch: true
      });
      return updateOBJ(prevState, { [type]: updatedData });
    });
  };

  return (
    <div className={styles.Signup}>
      {authRedirectPath !== '/' && <Redirect to={authRedirectPath} />}

      {error && (
        <Modal show clicked={clearAuthError}>
          {error}
        </Modal>
      )}

      <div className={styles.wrap}>
        <Card className={styles.card}>
          <div className={styles.title}>
            <span>註冊</span>
            <div className={styles.loading}>{loading && <Loading />}</div>
          </div>
          <div>
            <SignForm data={signupFormData} changed={changeHandler} />
          </div>
          <div className={styles.btns}>
            <Button clicked={() => onSignUp(signupFormData)}>送出</Button>
            <Button clicked={() => props.history.push('/signin')}>登入</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Signup, axios));
