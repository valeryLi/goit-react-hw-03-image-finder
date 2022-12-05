import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, smallImage, query }) => {
  return (
    <li className={s.gallery_item} key={id}>
      <img className={s.gallery_img} src={smallImage} alt={query} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  name: PropTypes.string,
};
