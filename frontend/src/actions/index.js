import {
  FETCH_ALL_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  SET_POSTS_SORTING,
  POST_VOTE,
  FETCH_CATEGORIES,
  FETCH_POSTS_BY_CATEGORY
} from '../actions/types'

import * as PostAPIs from '../utils/postApis'
import * as CommentAPIs from '../utils/commentApis'
import * as CategoryAPIs from '../utils/categoryApis'

export const SortOrder = {
  DATE_ASCENDING: 'DATE_ASCENDING',
  DATE_DESCENDING: 'DATE_DESCENDING',
  SCORE_ASCENDING: 'SCORE_ASCENDING:',
  SCORE_DESCENDING: 'SCORE_DESCENDING:'
}

export const fetchPosts = () => dispatch => {
  PostAPIs.fetchPosts()
  .then(posts => dispatch(fetchPostsAsync(posts)))
}

function fetchPostsAsync(posts) {  
  return {
    type: FETCH_ALL_POSTS,
    posts
  };
}

export const setPostsSorting = sortBy => ({
  type: SET_POSTS_SORTING,
  sortBy
})

export const vote = (id, voteType) => dispatch => {
  PostAPIs.vote(id, voteType)
  .then(post => dispatch(postByIdAsync(post, POST_VOTE)))
}

function postByIdAsync(post, actionType) {  
  return {
    type: actionType,
    post
  };
}

export const fetchCategories = () => dispatch => {
  CategoryAPIs.fetchCategories()
  .then(categories => dispatch(fetchCategoriesAsync(categories)))
}

function fetchCategoriesAsync(categories) {  
  return {
    type: FETCH_CATEGORIES,
    categories
  };
}

export const fetchPostsByCategory = category => dispatch => {
  PostAPIs.fetchPostsByCategory(category)
  .then(posts => dispatch(fetchPostsByCatAsync(posts)))
}

function fetchPostsByCatAsync(posts) {  
  return {
    type: FETCH_POSTS_BY_CATEGORY,
    posts
  };
}

export const createPost = data => dispatch => {
  PostAPIs.addPost(data)
  .then(post => dispatch(postByIdAsync(post, CREATE_POST)))
}

export const fetchPost = id => dispatch => {
  PostAPIs.fetchPost(id)
  .then(post =>
    CommentAPIs.fetchComments(post.id)
    .then(comments => (post.comments = comments))
    .then(() => post)
  )
  .then(post => dispatch(postByIdAsync(post, FETCH_POST)))
}