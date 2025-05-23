import axios from 'axios';

const theDailyOliveApi = axios.create({
  baseURL: 'https://the-daily-olive.onrender.com/api',
});

export default theDailyOliveApi;