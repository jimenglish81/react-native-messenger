import { MESSAGE_ADDED, ENTER_ROOM, LOGOUT } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ENTER_ROOM:
    case `${LOGOUT}_FULFILLED`:
      return INITIAL_STATE;
    case MESSAGE_ADDED:
      return [ ...state, action.payload ];
    default:
      return state;
  };
}
