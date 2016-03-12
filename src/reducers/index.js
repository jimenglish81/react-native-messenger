import { combineReducers } from 'redux';
import user from './user';
import rooms from './rooms';
import messages from './messages';

export default combineReducers({
  messages,
  user,
  rooms,
});
