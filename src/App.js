import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Todo from './containers/Todo/Todo';
import Done from './containers/Done/Done';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Todo} />
        <Route path="/done" component={Done} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Redirect to="/" />
      </Switch>

      <div id="global-modal"></div>
    </div>
  );
};

export default App;
