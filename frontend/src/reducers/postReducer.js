import {
  FETCH_ALL_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  POST_VOTE,
  FETCH_POSTS_BY_CATEGORY
} from '../actions/types'

import { arrayToObject } from '../utils/helpers'

export default function(state = {}, action) {
  switch (action.type) {
  	case FETCH_ALL_POSTS:
    case FETCH_POSTS_BY_CATEGORY:
      return {
        ...state,
        posts: arrayToObject(action.posts, 'id') 
    }
    case POST_VOTE:
      const p = state.posts
      p[action.post.id] = action.post
      //alert('pppp ' + JSON.stringify(p))
      return {
        ...state,
        posts: p
    }
    case FETCH_POST:
      return { ...state, [action.post.id]: action.post };
    default:
      return state;
  }
}