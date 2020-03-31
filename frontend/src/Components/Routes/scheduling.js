import axios from 'axios';

const create = axios.create({
    baseURL: 'http://localhost:8000/scheduling'
});

export default create;