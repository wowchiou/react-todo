import React from 'react';
import styles from './withErrorHandler.module.scss';

import useHttpErrorHandler from '../../hooks/http-error-handler';
import Button from '../../UI/Button/Button';

const withErrorHandler = (WrappedComponents, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    let classes = [styles.error];
    error ? classes.push(styles.show) : classes.push(styles.hide);

    return (
      <>
        <div className={classes.join(' ')}>
          <p>{error && error.response.data.error.message}</p>
          <Button clicked={clearError}>確認</Button>
        </div>
        <WrappedComponents {...props} />
      </>
    );
  };
};

export default withErrorHandler;
