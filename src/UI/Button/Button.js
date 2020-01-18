import React from 'react';
import styles from './Button.module.scss';

const Button = React.memo(props => {
  return (
    <button
      className={styles.Button}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
});

export default React.memo(Button);
