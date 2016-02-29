import Firebase from 'firebase';
import Promise from 'bluebird';
import Fireproof from 'fireproof';

Fireproof.Promise = Promise;
const firebase = new Firebase('https://crackling-torch-4917.firebaseio.com/');
const fireproof = new Fireproof(firebase);

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';

export function login(email, password) {
  return {
    type: LOGIN,
    promise: fireproof.authWithPassword({ email, password }),
  };
}

export function signUp(email, password) {
  return {
    type: SIGN_UP,
    promise: fireproof.createUser({ email, password }),
  };
}

export function addMessage() {
  return {
    type: ADD_MESSAGE,
    payload: 'something',
  };
}
