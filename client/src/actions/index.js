import axios from 'axios';

export function getBooks(limit = 0, start = 0, order = 'asc', list = '') {
  const request = axios
    .get(`http://localhost:3000/api/getbooks?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      }
      return response.data;
    });

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}
