import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import findKey from 'lodash/findKey';
import { ADD_SHELF, REMOVE_SHELF } from './actions';

function shelves(state = {
    1: {id:1, name:'Shelf1'}
  }, action) {
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

  // JSON parsing
  if (action.json) {
    const { json } = action;

    return Object.assign({}, state, 
      json.releases.map((x) => {
        return {
          'id': x['basic_information']['id'],
          'title': x['basic_information']['title'],
          'shelf': 1
        }
      }));
  }

  // Move release
  else if (action.release && action.shelf) {
    const { release } = action
    const key = findKey(state, (x) => x.id === release.id)
    return merge({}, state, {
      [key]: {
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