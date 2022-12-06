import { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  render() {
    return (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
