import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import { ADD_RELEASE, REMOVE_RELEASE } from './actions';

function shelves(state = {}, action) {
  switch (action.type) {
    case ADD_RELEASE:
      return Object.assign({}, action.shelf, {
        titles: [...action.shelf.titles, action.release]
      });
    case REMOVE_RELEASE:
      const { titles, release } = action.shelf;
      const index = titles.indexOf(release);
      return Object.assign({}, state, {
        titles: [
          ...titles.slice(0, index),
          ...titles.slice(index+1)
        ]
      }); 
    default:
      return state;
  }
}

function releases(state = {}, action) {
  return state;
}

const rootReducer = combineReducers({
  shelves,
  releases
});

export default rootReducer;