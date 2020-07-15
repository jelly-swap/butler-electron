import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'unset',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '83%',
    width: '66%',
    zIndex: 1000,
  },
};

Modal.setAppElement('body');

export const AppModal = ({ isOpen, children, styles }) => {
  return (
    <Modal style={{ ...customStyles, ...styles }} isOpen={isOpen}>
      {children}
    </Modal>
  );
};
