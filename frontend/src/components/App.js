import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './home'
import CategoryHome from './categoryHome'
import PostsNew from './postsNew'
import PostsShow from './postsShow'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path='/:category' component={CategoryHome}/>
          <Route exact path='/posts/new' component={PostsNew} />
          <Route exact path="/posts/:id" component={PostsShow} />
        </Switch>
      </Router>
    )
  }
}


export default App;
