import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { ADD_SHELF, REMOVE_SHELF } from './actions';

function shelves(state = {}, action) {
  switch(action.type) {
    case ADD_SHELF:
      const nextId = Object.keys(state).length !== 0
         ? Math.max(...Object.keys(state)) + 1 
         : 1
      return merge({}, state, {
        [nextId]: {
          id: nextId,
          name: `Untitled${nextId}`
        }
      })
    case REMOVE_SHELF:
      return omit(state, action.id);
  }

  return state;
}

function releases(state = {}, action) {
  if (action.release && action.shelf) {
    const { release } = action
    return merge({}, state, {
      [release.id]: {
        shelf: action.shelf.id
      }
    });
  }

  return state;
}

const rootReducer = combineReducers({
  shelves,
  releases
});

export default rootReducer;