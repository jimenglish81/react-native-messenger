import { LOGIN, SIGN_UP } from '../actions/index';
const INITIAL_STATE = {};

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return { uid: action.payload.uid };
    case `${SIGN_UP}_FULFILLED`:
      return { ...state, ...action.payload };
    default:
      return state;
  };
}
