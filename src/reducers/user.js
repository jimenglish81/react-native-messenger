import { LOGIN, SIGN_UP, LOGOUT } from '../actions/index';
const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${LOGIN}_FULFILLED`:
    case `${SIGN_UP}_FULFILLED`:
      return { uid: payload.uid, email: payload.password.email };
    case `${LOGOUT}_FULFILLED`:
      return INITIAL_STATE;
    default:
      return state;
  };
}
