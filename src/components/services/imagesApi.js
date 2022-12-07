import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '30693529-0739abc7bb5433c19d02cabbb';
export let countTotalPages = 0;

export async function fetchImages(query, page) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        page,
        per_page: 12,
        image_type: 'photo',
        orientation: 'orientation',
        safesearch: true,
      },
    });
    countTotalPages = Math.ceil(response.data.totalHits / 12);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
