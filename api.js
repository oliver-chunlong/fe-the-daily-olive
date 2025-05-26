import axios from 'axios';

const theDailyOliveApi = axios.create({
  baseURL: 'https://the-daily-olive.onrender.com/api',
});

export const fetchArticlesByTopic = (topic, sortBy = 'created_at', orderBy = 'desc') => {
  return theDailyOliveApi
    .get('/articles', {
      params: {
        topic,
        sort_by: sortBy,
        order: orderBy,
      },
    })
    .then((res) => res.data.articles);
};

export default theDailyOliveApi;