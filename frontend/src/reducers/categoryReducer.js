import { FETCH_CATEGORIES, SET_CATEGORY } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
    return {
    	...state,
    	categories: [...action.categories]
    }
//      return [ ...state, ...action.categories ]
    default:
      return state
  }
}