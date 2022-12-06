import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ loadMore }) => (
  <button className={s.Button} type="button" onClick={loadMore}>
    Load more
  </button>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
