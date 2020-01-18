import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Layout.module.scss';

import Navigation from '../Navigation/Navigation';
import Button from '../../UI/Button/Button';

const Layout = props => {
  const logOutHandler = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId');
    props.history.push('/signin');
  };

  if (!localStorage.getItem('idToken')) {
    props.history.push('/signin');
  }

  return (
    <>
      <header className={styles.header}>
        <Navigation />
        <div className={styles.logout}>
          <Button clicked={logOutHandler}>登出</Button>
        </div>
      </header>
      <main>{props.children}</main>
    </>
  );
};

export default withRouter(Layout);
