import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Signin from './containers/Signin/Signin';

const App = () => {
  console.log('APP');

  return (
    <div>
      <Switch>
        {localStorage.getItem('idToken') && (
          <Route path="/" exact component={Home} />
        )}
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Redirect to="/" />
      </Switch>

      <div id="global-modal"></div>
    </div>
  );
};

export default App;

// import React, { useState, useCallback, useRef } from 'react';
// import Button from './UI/Button/Button';

// const List = React.memo(
//   props => {
//     console.log('List');
//     return <li onClick={props.clicked}>{props.children}</li>;
//   },
//   (prevProps, currentProps) => {
//     if (prevProps.children === currentProps.children) {
//       return true;
//     }
//   }
// );

// const App = () => {
//   console.log('App');
//   const [listData, setListData] = useState([]);
//   const inputEl = useRef(null);

//   const submitHandler = useCallback(() => {
//     if (inputEl.current.value.trim() !== '') {
//       setListData(prevState => {
//         return [...prevState, inputEl.current.value];
//       });
//     }
//   }, []);

//   const deleteList = useCallback(
//     item => {
//       const list = listData.filter(itm => itm !== item);
//       setListData([...list]);
//     },
//     [listData]
//   );

//   return (
//     <div>
//       <input ref={inputEl} type="text" />
//       <ul>
//         {listData.map((itm, idx) => (
//           <List key={itm + idx} clicked={() => deleteList(itm)}>
//             {itm}
//           </List>
//         ))}
//       </ul>
//       <Button clicked={submitHandler}>click me</Button>
//     </div>
//   );
// };

// export default App;
