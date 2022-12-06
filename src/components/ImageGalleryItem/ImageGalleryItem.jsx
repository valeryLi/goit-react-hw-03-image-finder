import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  smallImage,
  largeImage,
  query,
  openModal,
}) => {
  return (
    <img
      className={s.gallery_img}
      src={smallImage}
      alt={query}
      onClick={() => {
        openModal(largeImage);
      }}
    />
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  query: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};
