import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './components/App'
import { createStore, applyMiddleware } from 'redux';  
import thunk from 'redux-thunk';  
import reducer from './reducers'
import { Provider } from 'react-redux'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);  

const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
