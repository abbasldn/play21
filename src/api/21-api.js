import axios from 'axios';

const deckOfCardsApi = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/',
});

export default deckOfCardsApi;
