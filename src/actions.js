export const ADD_RELEASE = 'ADD_RELEASE';
export function addRelease(release, shelf) {
  return {
    type: ADD_RELEASE,
    release,
    shelf
  };
}

export const REMOVE_RELEASE = 'REMOVE_RELEASE';
export function removeRelease(release, shelf) {
  return {
    type: REMOVE_RELEASE,
    release,
    shelf
  }
}