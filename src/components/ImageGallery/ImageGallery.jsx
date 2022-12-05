import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGalerry.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, query, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          name={query}
          smallImage={smallImage}
          largeImage={largeImage}
        />
      ))}
    </ul>
  );
};
