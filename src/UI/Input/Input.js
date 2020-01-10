import React from 'react';
import styles from './Input.module.scss';

const Input = props => {
  console.log('Input');

  const classes = [styles.Input];
  !props.valid && props.touch && classes.push(styles.error);

  let inputElement = <p>Input Error</p>;

  switch (props.type) {
    case 'input':
      return (inputElement = (
        <input
          className={classes.join(' ')}
          type={props.inputType}
          name={props.name}
          {...props.config}
          value={props.value}
          onChange={props.changed}
        />
      ));
    case 'select':
      return;
    case 'textarea':
      return;
    default:
      return inputElement;
  }
};

export default Input;
