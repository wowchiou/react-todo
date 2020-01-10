import React from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.scss';

const Modal = props => {
  const globalModal = window.document.getElementById('global-modal');

  const modal = (
    <>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={styles.Modal}>
        <div className={styles.close} onClick={props.clicked}>
          <span></span>
          <span></span>
        </div>
        {props.children}
      </div>
    </>
  );

  return createPortal(modal, globalModal);
};

export default Modal;
