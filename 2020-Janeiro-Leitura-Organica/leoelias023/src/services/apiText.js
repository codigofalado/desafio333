import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.randomtext.me/api/'
})

export default api;