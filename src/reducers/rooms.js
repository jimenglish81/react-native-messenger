import { FETCH_ROOMS, ADD_ROOM } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case `${ADD_ROOM}_FULFILLED`:
      return [ ...state, { ...action.payload.val(), roomId: action.payload.key() } ];
    case `${FETCH_ROOMS}_FULFILLED`:
      const rooms = [];
      action.payload.forEach((snapshot) => {
        rooms.push({ ...snapshot.val(), roomId: snapshot.key() });
      });
      return [ ...state, ...rooms ];
    default:
      return state;
  };
}
