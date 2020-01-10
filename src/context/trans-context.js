import React, { useState } from 'react';

export const TransContext = React.createContext({
  show: false,
  changeTransShow: status => {}
});

export default props => {
  const [isTransShow, setIsTransShow] = useState(false);

  const transHandler = status => {
    setIsTransShow(status);
  };

  return (
    <TransContext.Provider
      value={{
        show: isTransShow,
        changeTransShow: transHandler
      }}
    >
      {props.children}
    </TransContext.Provider>
  );
};
