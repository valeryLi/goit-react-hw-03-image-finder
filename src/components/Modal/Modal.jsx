import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalByBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { query, largeImage } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.closeModalByBackdrop}>
        <div className={s.Modal}>
          <img src={largeImage} alt={query} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  query: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
