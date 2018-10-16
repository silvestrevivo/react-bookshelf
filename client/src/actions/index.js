import axios from 'axios';

export function getBooks(limit = 0, start = 0, order = 'asc') {
  const request = axios
    .get(`http://localhost:3000/api/getbooks?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => response.data);

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}
