import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
  } from "../../actions/session";

  import defaultAvatar from '../../images/defaultAvatar.jpg'

  const _nullSession = { userId: null, username: null, userAvatar: defaultAvatar }
  
  export default (state = _nullSession, { type, user }) => {
    Object.freeze(state);
    switch (type) {
      case RECEIVE_CURRENT_USER:
        return user;
      case LOGOUT_CURRENT_USER:
        return _nullSession;
      default:
        return state;
    }
  };