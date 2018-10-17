import axios from 'axios'

// BOOKS //
export function getBooks(limit = 0, start = 0, order = 'asc', list = '') {
  const request = axios.get(`/api/getbooks?limit=${limit}&skip=${start}&order=${order}`).then(response => {
    if (list) {
      return [...list, ...response.data]
    }
    return response.data
  })

  return {
    type: 'GET_BOOKS',
    payload: request,
  }
}

export function getBooksWithReviewer(id) {
  const request = axios.get(`/api/getBook?id=${id}`)

  return dispatch => {
    request.then(response => {
      const book = response.data

      axios.get(`/api/getReviewer?id=${book.ownerId}`).then(({ data }) => {
        const resp = {
          book,
          reviewer: data,
        }
        dispatch({
          type: 'GET_BOOK_W_REVIEWER',
          payload: resp,
        })
      })
    })
  }
}

export function clearBooksWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {},
    },
  }
}

// USER //
export function loginUser({ email, password }) {
  const request = axios.post(`/api/login`, { email, password })

  return dispatch => {
    request
      .then(response => {
        const { data } = response
        dispatch({
          type: 'USER_LOGIN_SUCCESS',
          payload: data,
        })
      })
      .catch(error => {
        if (error.response.status === 400) {
          dispatch({
            type: 'USER_LOGIN_ERROR',
            payload: error.response.data,
          })
        }
      })
  }
}

export function auth() {
  const request = axios.get('/api/auth')

  return dispatch => {
    request
      .then(response => {
        const { data } = response
        dispatch({
          type: 'USER_AUTH_SUCCESS',
          payload: data,
        })
      })
      .catch(error => {
        if (error.response.status === 400) {
          dispatch({
            type: 'USER_AUTH_ERROR',
            payload: error.response.data,
          })
        }
      })
  }
}
