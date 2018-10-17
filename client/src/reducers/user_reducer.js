export default function(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, login: action.payload };
    case 'USER_LOGIN_ERROR':
      return { ...state, login: action.payload };
    case 'USER_AUTH_SUCCESS':
      console.log('success', { ...state, login: action.payload });
      return { ...state, login: action.payload };
    case 'USER_AUTH_ERROR':
      console.log('error', { ...state, login: action.payload });
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
