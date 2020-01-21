import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import styles from './Layout.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Navigation from '../Navigation/Navigation';
import Button from '../../UI/Button/Button';

const mapStateToProps = state => {
  return {
    isLogIn: state.auth.tokenId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actions.onLogOut())
  };
};

const Layout = props => {
  const { onLogOut, children, isLogIn } = props;

  return (
    <>
      <header className={styles.header}>
        <Navigation />
        <div className={styles.logout}>
          <Button clicked={onLogOut}>登出</Button>
        </div>
      </header>
      <main>
        {!isLogIn && <Redirect to="signin" />}
        {children}
      </main>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Layout));
