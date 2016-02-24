export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage() {
  return {
    type: ADD_MESSAGE,
    payload: 'something',
  }
}
