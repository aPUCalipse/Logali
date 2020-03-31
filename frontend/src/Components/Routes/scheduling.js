import axios from 'axios';

const create = axios.create({
    baseURL: 'http://localhost:3000/scheduling'
});

export default create;