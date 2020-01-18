import React from 'react';
import styles from './withErrorHandler.module.scss';
import { withRouter } from 'react-router-dom';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import Button from '../../UI/Button/Button';
import { logOut } from '../../shared/utility';

const withErrorHandler = (WrappedComponents, axios) => {
  return withRouter(props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    let classes = [styles.error];
    error ? classes.push(styles.show) : classes.push(styles.hide);

    let errorMessage = '';
    let isLogOut = false;

    if (error && error.response) {
      if (error.response.status === 404) {
        errorMessage = '系統發生問題,請稍候再試';
        isLogOut = true;
      } else {
        errorMessage = error.response.data.error.message;
      }
    } else if (error && !error.response) {
      errorMessage = '請確認網路連線';
    } else {
      errorMessage = '系統發生問題,請稍候再試';
    }

    const logOutHandler = () => {
      logOut(props);
    };

    return (
      <>
        <div className={classes.join(' ')}>
          <p>{errorMessage}</p>
          <Button clicked={isLogOut ? logOutHandler : clearError}>確認</Button>
        </div>
        <WrappedComponents {...props} />
      </>
    );
  });
};

export default withErrorHandler;
