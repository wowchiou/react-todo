import React from 'react';
import NavItem from './NavItem/NavItem';

import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <ul className={styles.Navigation}>
      <NavItem link="/" exact>
        TO DO
      </NavItem>
      <NavItem link="/done">Done</NavItem>
    </ul>
  );
};

export default Navigation;
