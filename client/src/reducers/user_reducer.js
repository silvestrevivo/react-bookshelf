export default function(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, login: action.payload }
    case 'USER_LOGIN_ERROR':
      return { ...state, login: action.payload }
    case 'USER_AUTH_SUCCESS':
      return { ...state, login: action.payload }
    case 'USER_AUTH_ERROR':
      console.log(action.payload.message)
      return { ...state, login: action.payload }
    case 'GET_USER_POSTS':
      return { ...state, userPosts: action.payload }
    case 'GET_USERS':
      return { ...state, users: action.payload }
    case 'USER_REGISTER':
      return {
        ...state,
        register: action.payload.success,
        users: action.payload.users,
      }
    default:
      return state
  }
}
