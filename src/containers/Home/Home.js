import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styles from './Home.module.scss';

import Navigation from '../../components/Navigation/Navigation';
import Todo from '../Todo/Todo';
import Done from '../Done/Done';
import Button from '../../UI/Button/Button';

const Home = props => {
  let { path, url } = useRouteMatch();

  const signoutHandler = () => {
    localStorage.removeItem('idToken');
    props.history.push('/signin');
  };

  return (
    <div>
      <header className={styles.header}>
        <Navigation logout={signoutHandler} />
        <div className={styles.logout}>
          <Button clicked={signoutHandler}>登出</Button>
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={Todo} />
          <Route path="/done" component={Done} />
        </Switch>
      </main>
    </div>
  );
};

export default Home;
