import React from 'react';

import Button from '../../UI/Button/Button';

const Home = props => {
  console.log('HOME');

  const signoutHandler = () => {
    localStorage.removeItem('idToken');
    props.history.push('/signin');
  };

  return (
    <div>
      <Button clicked={signoutHandler}>登出</Button>
    </div>
  );
};

export default Home;
