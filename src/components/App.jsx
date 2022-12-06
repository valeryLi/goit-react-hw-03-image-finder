import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './services/imagesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { imagesMapper } from 'utils/mapper';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import s from './App.module.css';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getImage();
    }
  }

  handleFormSubmit = query => {
    if (this.state.query !== query) {
      this.setState({ query, page: 1, images: [] });
    }
  };

  getImage = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });

    const imagesArray = await fetchImages(query, page);
    if (imagesArray.length === 0) {
      this.setState({ isLoading: false });
      alert('No images');
    }
    console.log(imagesArray);

    this.setState(prevState => ({
      images: [...prevState.images, ...imagesMapper(imagesArray)],
    }));

    this.setState({ isLoading: false });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { images, isLoading, currentImage, query } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button loadMore={this.loadMore} />}
        {currentImage && (
          <Modal
            closeModal={this.closeModal}
            query={query}
            largeImage={currentImage}
          />
        )}
      </div>
    );
  }
}
