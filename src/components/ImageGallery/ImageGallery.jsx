import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGalerry.module.css';

export const ImageGallery = ({ images, openModal, query }) => {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, smallImage, largeImage }) => (
        <li className={s.gallery_item} key={id}>
          <ImageGalleryItem
            key={id}
            name={query}
            smallImage={smallImage}
            largeImage={largeImage}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImage: PropTypes.string.isRequired,
      smallImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};
