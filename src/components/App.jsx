import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import imagesApi from '../components/services/imagesApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { imagesMapper } from 'utils/mapper';

// import { BASE_URL } from './services/imagesApi';
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    // isLoading: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImage();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  getImage = async () => {
    const { page, query } = this.state;

    const array = await imagesApi(query, page);
    console.log(array);

    this.setState(prevState => ({
      images: [...prevState.images, ...imagesMapper(array.hits)],
    }));
  };
  //
  //

  // openModal()
  // closeModal()

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
      </>
    );
  }
}
