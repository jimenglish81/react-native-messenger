import { LOGIN, SIGN_UP } from '../actions/index';
const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
    case `${SIGN_UP}_FULFILLED`:
      return { ...state, ...action.payload.password, ...action.payload.auth };
    default:
      return state;
  };
}
