import axios from 'axios';

const theDailyOliveApi = axios.create({
  baseURL: 'http://localhost:9090/api',
});

export default theDailyOliveApi;