import { ROOM_ADDED } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ROOM_ADDED:
      return [ ...state, action.payload ];
    default:
      return state;
  };
}
