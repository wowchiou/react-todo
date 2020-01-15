import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import styles from './NavItem.module.scss';

const NavItem = props => {
  let { path, url } = useRouteMatch();

  console.log(path);
  console.log(url);

  return (
    <li className={styles.NavItem}>
      <NavLink
        to={url + props.link}
        exact={props.exact}
        activeClassName={styles.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
