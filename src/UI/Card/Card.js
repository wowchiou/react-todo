import React from 'react';
import styles from './Card.module.scss';

const Card = props => <div className={styles.Card}>{props.children}</div>;

export default Card;
