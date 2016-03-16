import { ENTER_ROOM, LOGOUT } from '../actions/index';
const INITIAL_STATE = {};

// TODO - add LEAVE_ROOM
export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case `${ENTER_ROOM}_FULFILLED`:
      return { ...action.payload };
    case `${LOGOUT}_FULFILLED`:
      return INITIAL_STATE;
    default:
      return state;
  }
}
