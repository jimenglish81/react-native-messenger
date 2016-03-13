import { ROOM_ADDED, REMOVE_ROOM } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ROOM_ADDED:
      return [ ...state, action.payload ];
    case `${REMOVE_ROOM}_FULFILLED`:
      return [ ...state.filter((room) => room.roomId !== action.payload.roomId) ];
    default:
      return state;
  };
}
