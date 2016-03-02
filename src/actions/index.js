import Firebase from 'firebase';
import Fireproof from 'fireproof';

const firebase = new Firebase('https://crackling-torch-4917.firebaseio.com/');
const fireproof = new Fireproof(firebase);
const rooms = fireproof.child('chats');

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const ADD_CHAT = 'ADD_CHAT';

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      promise: fireproof.authWithPassword({ email, password }),
    },
  };
}

export function signUp(email, password) {
  return {
    type: SIGN_UP,
    payload: {
      promise: fireproof.createUser({ email, password }),
    },
  };
}

export function addMessage() {
  return {
    type: ADD_MESSAGE,
    payload: 'something',
  };
}

export function addChat(uid, name) {
  return {
    type: ADD_CHAT,
    payload: {
      promise: rooms.push().set({
        uid,
        name,
      }),
    },
  };
}
