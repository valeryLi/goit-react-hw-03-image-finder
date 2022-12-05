import axios from 'axios';

// const axios = require('axios').default;
export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30693529-0739abc7bb5433c19d02cabbb';

async function getImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
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
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default getImages;
