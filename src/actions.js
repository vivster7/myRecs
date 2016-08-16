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