import { ROOM_ADDED, ROOM_REMOVED, LOGOUT } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ROOM_ADDED:
      return [ ...state, action.payload ];
    case ROOM_REMOVED:
      return state.filter((room) => room.roomId !== action.payload.roomId);
    case `${LOGOUT}_FULFILLED`:
      return INITIAL_STATE;
    default:
      return state;
  };
}
