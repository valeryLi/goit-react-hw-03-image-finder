import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages, countTotalPages } from './services/imagesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { imagesMapper } from 'utils/mapper';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    currentImage: null,
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, totalPages } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.getImage();
    }

    if (page > 1) {
      this.scrollImages();
    }

    if (page === totalPages) {
      this.notifyAboutLastPage();
      this.setState({ totalPages: 0 });
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
      this.notifyAboutError();
      this.setState({ isLoading: false });
    }

    console.log(imagesArray);

    this.setState(prevState => ({
      images: [...prevState.images, ...imagesMapper(imagesArray)],
    }));

    this.setState({ totalPages: countTotalPages });

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

  scrollImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  notifyAboutError() {
    toast.error('Sorry, but there are no matching results.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  notifyAboutLastPage() {
    toast.info("We're sorry, but you've reached the end of search results.", {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  render() {
    const { images, isLoading, currentImage, query, totalPages, page } =
      this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && totalPages > page && (
          <Button loadMore={this.loadMore} />
        )}
        {currentImage && (
          <Modal
            closeModal={this.closeModal}
            query={query}
            largeImage={currentImage}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
