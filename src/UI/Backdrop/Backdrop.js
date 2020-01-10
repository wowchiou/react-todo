import React from 'react';

import styles from './Backdrop.module.scss';

const Backdrop = props => {
  const classes = [styles.Backdrop];
  props.show ? classes.push(styles.show) : classes.push(styles.hide);

  return <div className={classes.join(' ')} onClick={props.clicked}></div>;
};

export default Backdrop;
