import React from 'react';

import styles from './Trans.module.scss';

const Trans = props => {
  const classes = [styles.Trans];
  props.active ? classes.push(styles.active) : classes.push(styles.hide);

  return (
    <div className={classes.join(' ')}>
      <div className={styles.trans1}></div>
      <div className={styles.trans2}></div>
      <div className={styles.trans3}></div>
      <div className={styles.trans4}></div>
      <div className={styles.trans5}></div>
    </div>
  );
};

export default Trans;
