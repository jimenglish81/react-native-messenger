import { LOGIN, SIGN_UP } from '../actions/index';
const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, { type, payload }) {
  switch (type) {
    case `${LOGIN}_FULFILLED`:
    case `${SIGN_UP}_FULFILLED`:
      return { uid: payload.uid, email: payload.password.email };
    default:
      return state;
  };
}
