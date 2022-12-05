import { array } from 'prop-types';

export const imagesMapper = array => {
  return array.map(
    ({ id, webformatURL: smallImage, largeImageURL: largeImage }) => ({
      id,
      smallImage,
      largeImage,
    })
  );
};
