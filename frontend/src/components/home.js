import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, setPostsSorting, SortOrder, vote} from "../actions";
import ListPosts from './listPosts'

class Home extends Component {
  componentWillMount() {
    this.props.fetchPosts()
    this.props.setPostsSorting(SortOrder.SCORE_DESCENDING)
  }

  handleVote = (id, voteType) => {
    this.props.vote(id, voteType)
  }
  
  render() {
      return (
	    	<ListPosts 
	    		posts={this.props.posts}
	    		sortBy={this.props.sortBy}
          handleVote={this.handleVote}
	    	/> 
	   )
	 }
}

const mapStateToProps = state => {
  return ({
    posts: state.posts.posts,
    sortBy: state.sortOrder.sort ? state.sortOrder.sort : '',
  })
}

export default connect(mapStateToProps, { fetchPosts, setPostsSorting, vote })(Home);