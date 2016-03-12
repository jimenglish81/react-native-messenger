import { ADD_MESSAGE, FETCH_MESSAGES } from '../actions/index';
const INITIAL_STATE = [];

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case `${ADD_MESSAGE}_FULFILLED`:
      return [ ...state, { ...action.payload.val(), messageId: action.payload.key() } ];
    case `${FETCH_MESSAGES}_FULFILLED`:
      const messages = [];
      action.payload.forEach((snapshot) => {
        messages.push({ ...snapshot.val(), messageId: snapshot.key() });
      });
      return [ ...state, ...messages ];
    default:
      return state;
  };
}
