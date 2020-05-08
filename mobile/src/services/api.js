import axios from 'axios';
//https://radiant-wave-41754.herokuapp.com/
const api = axios.create({
    baseURL:'https://radiant-wave-41754.herokuapp.com/'
});

export default api;