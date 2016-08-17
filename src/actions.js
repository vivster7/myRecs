import fetch from 'isomorphic-fetch'

export const MOVE_RELEASE = 'MOVE_RELEASE';
export function moveRelease(release, shelf) {
  return {
    type: MOVE_RELEASE,
    release,
    shelf
  };
}

export const ADD_SHELF = 'ADD_SHELF';
export const REMOVE_SHELF = 'REMOVE_SHELF';

export function addShelf() {
  return {
    type: ADD_SHELF
  };
}

export function removeShelf(id) {
  return {
    type: REMOVE_SHELF,
    id
  };
}

export const REQUEST_RECORDS = 'REQUEST_RECORDS';
export const RECEIVE_RECORDS = 'RECEIVE_RECORDS';

export function fetchRecords() {
  return (dispatch) => {
    return fetch(`/records`,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        return dispatch(receiveRecords(json))
      })
  };
}

function receiveRecords(json) {
  return {
    type: RECEIVE_RECORDS,
    json
  }
}