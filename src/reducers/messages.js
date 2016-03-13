import { MESSAGE_ADDED, ENTER_ROOM } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ENTER_ROOM:
      return INITIAL_STATE;
    case MESSAGE_ADDED:
      return [ ...state, action.payload ];
    default:
      return state;
  };
}
