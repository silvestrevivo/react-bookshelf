export default function(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, login: action.payload };
    case 'USER_LOGIN_ERROR':
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
