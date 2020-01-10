import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  authStatusHandler: status => {}
});

const AuthContextProvider = props => {
  const [authStatus, setAuthStatus] = useState(false);

  const authStatusHandler = status => {
    setAuthStatus(status);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: authStatus, authStatusHandler: authStatusHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
