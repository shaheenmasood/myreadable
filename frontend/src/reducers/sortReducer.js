import {
  SET_POSTS_SORTING
} from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case SET_POSTS_SORTING:
      return { ...state, sort: action.sortBy }
    default:
      return state;
  }
}