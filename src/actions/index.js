import Firebase from 'firebase';
import Fireproof from 'fireproof';

const firebase = new Firebase('https://crackling-torch-4917.firebaseio.com/');
const fireproof = new Fireproof(firebase);
const rooms = fireproof.child('rooms');

export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const ROOM_ADDED = 'ROOM_ADDED';
export const ENTER_ROOM = 'ENTER_ROOM';
export const ROOM_REMOVED = 'ROOM_REMOVED';
export const MESSAGE_ADDED = 'MESSAGE_ADDED';

let currentRoom = null;

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
  rooms.off('child_added');

  return (dispatch) => {
    rooms
      .orderByKey()
      .on('child_added', (snapshot) => {
        dispatch(roomAdded({ ...snapshot.val(), roomId: snapshot.key() }));
      });
  };
}

export function roomAdded(payload) {
  return {
    type: ROOM_ADDED,
    payload,
  };
}

export function addRoom(userId, name) {
  return () => {
    rooms.push({
      userId,
      name,
      date: (new Date()).getTime(),
    });
  };
}

export function removeRoom(roomId) {
  return {
    type: ROOM_REMOVED,
    payload: {
      promise: rooms.child(roomId).remove()
        .then(() => {
          return { roomId };
        }),
    },
  };
}

export function enterRoom(roomId) {
  return {
    type: ENTER_ROOM,
    payload: roomId,
  };
}

export function fetchMessages(roomId) {
  if (currentRoom) {
    currentRoom
      .child('messages')
      .off('child_added');
  }
  currentRoom = rooms.child(roomId);

  return (dispatch) => {
    currentRoom
      .child('messages')
      .orderByValue('time')
      .on('child_added', (snapshot) => {
        dispatch(messageAdded({ ...snapshot.val(), messageId: snapshot.key() } ));
      });
  };
}

export function messageAdded(payload) {
  return {
    type: MESSAGE_ADDED,
    payload,
  };
}

export function addMessage({ uid, email }, roomId, message) {
  const messages = rooms
                    .child(roomId)
                    .child('messages');

  return () => {
    messages.push({
      userId: uid,
      email,
      message,
      time: (new Date()).getTime(),
    });
  };
}
