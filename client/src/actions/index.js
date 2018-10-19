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

export function addBook(book) {
  const request = axios.post('/api/book', book)

  return dispatch => {
    request
      .then(({ data }) => {
        console.log(data)
        dispatch({
          type: 'ADD_BOOK',
          payload: data,
        })
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEWBOOK',
    payload: {},
  }
}

export function getUserPosts(userId) {
  const request = axios.get(`/api/user_posts?user=${userId}`).then(response => response.data)

  return {
    type: 'GET_USER_POSTS',
    payload: request,
  }
}

export function getBook(id) {
  const request = axios.get(`/api/getBook?id=${id}`).then(response => response.data)

  return {
    type: 'GET_BOOK',
    payload: request,
  }
}

export function updateBook(data) {
  const request = axios.put('/api/book_update', data).then(response => response.data)

  return {
    type: 'UPDATE_BOOK',
    payload: request,
  }
}

export function deleteBook(id) {
  const request = axios.delete(`/api/book_delete?id=${id}`).then(response => response.data)

  return {
    type: 'DELETE_BOOK',
    payload: request,
  }
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: {},
      updateBook: false,
      postDeleted: false,
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
        if (error.response.status === 403) {
          dispatch({
            type: 'USER_AUTH_ERROR',
            payload: error.response.data,
          })
        }
      })
  }
}

export function getUsers() {
  const request = axios.get('/api/users').then(response => response.data)

  return {
    type: 'GET_USERS',
    payload: request,
  }
}

export function userRegister(user, userList) {
  const request = axios.post(`/api/register`, user)

  return dispatch => {
    request.then(({ data }) => {
      let users = data.success ? [...userList, data.user] : userList
      let response = {
        success: data.success,
        users,
      }

      dispatch({
        type: 'USER_REGISTER',
        payload: response,
      })
    })
  }
}
