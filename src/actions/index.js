import Firebase from 'firebase';
import Fireproof from 'fireproof';

const firebase = new Firebase('https://crackling-torch-4917.firebaseio.com/');
const fireproof = new Fireproof(firebase);
const rooms = fireproof.child('rooms');

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const ADD_ROOM = 'ADD_ROOM';
export const FETCH_ROOMS = 'FETCH_ROOMS';

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

export function fetchRooms() {
  return {
    type: FETCH_ROOMS,
    payload: {
      promise: rooms.once('value'),
    },
  };
}

export function addRoom(uid, name) {
  rooms.push({
    uid,
    name,
  });
  return {
    type: ADD_ROOM,
    payload: {
      promise: rooms.on('child_added'),
    },
  };
}
