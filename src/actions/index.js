import Firebase from 'firebase';
import Fireproof from 'fireproof';

const firebase = new Firebase('https://crackling-torch-4917.firebaseio.com/');
const fireproof = new Fireproof(firebase);
const rooms = fireproof.child('rooms');

export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const ADD_ROOM = 'ADD_ROOM';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';

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
      promise: fireproof.createUser({ email, password })
        .then((response) => {
          return { ...response, password: { email } };
        }),
    },
  };
}

export function fetchRooms() {
  return {
    type: FETCH_ROOMS,
    payload: {
      promise: rooms.orderByKey().once('value'),
    },
  };
}

export function addRoom(userId, name) {
  rooms.push({
    userId,
    name,
  });
  return {
    type: ADD_ROOM,
    payload: {
      promise: rooms.once('child_added'),
    },
  };
}

export function fetchMessages(roomId) {
  const messages = rooms
                    .child(roomId)
                    .child('messages')
                    .orderByValue('time');
  return {
    type: FETCH_MESSAGES,
    payload: {
      promise: messages.once('value'),
    },
  };
}

export function addMessage({ uid, email }, roomId, message) {
  const messages = rooms
                    .child(roomId)
                    .child('messages');
  messages.push({
    userId: uid,
    email,
    message,
    time: (new Date()).getTime(),
  });
  return {
    type: ADD_MESSAGE,
    payload: {
      promise: messages.once('child_added'),
    },
  };
}
