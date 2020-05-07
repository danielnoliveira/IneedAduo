const axios = require('axios');

const api = axios.create({
    baseURL:'https://radiant-wave-41754.herokuapp.com/'
});

export default api;