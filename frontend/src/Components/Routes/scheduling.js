import axios from 'axios';

const create = axios.create({
    baseURL: 'http://localhost:8000/logali/app/scheduling/'
});

export default create;