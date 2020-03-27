import axios from 'axios';

const api = axios.create({
  baseURL:  'http://loalhost:3333'
});

export default api;