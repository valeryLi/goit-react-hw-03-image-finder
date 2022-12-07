import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleImageName = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      return this.notifyAboutEmptyField();
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  notifyAboutEmptyField = () => {
    toast.warn('Please complete this mandatory field.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button className={s.button} type="submit">
            <span className={s.button_label}>Search</span>
          </button>

          <input
            className={s.input}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleImageName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
