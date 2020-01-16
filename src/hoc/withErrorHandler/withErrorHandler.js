import React from 'react';
import styles from './withErrorHandler.module.scss';

import useHttpErrorHandler from '../../hooks/http-error-handler';
import Button from '../../UI/Button/Button';

const withErrorHandler = (WrappedComponents, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    let classes = [styles.error];
    error ? classes.push(styles.show) : classes.push(styles.hide);

    let errorMessage = '';
    if (error && error.response) {
      errorMessage = error.response.data.error.message;
    } else if (error && !error.response) {
      errorMessage = '請確認網路連線';
    }

    return (
      <>
        <div className={classes.join(' ')}>
          <p>{errorMessage}</p>
          <Button clicked={clearError}>確認</Button>
        </div>
        <WrappedComponents {...props} />
      </>
    );
  };
};

export default withErrorHandler;
