import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import CategoryReducer from './categoryReducer'
import PostReducer from './postReducer'
import SortReducer from './sortReducer'

const rootReducer = combineReducers({
  categories: CategoryReducer,
  sortOrder: SortReducer,
  posts: PostReducer,
  form: FormReducer
});

export default rootReducer;