import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostsByCategory, setPostsSorting, SortOrder, vote} from "../actions";
import ListPosts from './listPosts'

class CateogyHome extends Component {
  componentWillMount() {
    this.props.fetchPostsByCategory(this.props.match.params.category)
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
          cat={this.props.match.params.category}
	    	/>
	   )
	 }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  sortBy: state.sortOrder.sort ? state.sortOrder.sort : '',
})

export default connect(mapStateToProps, { fetchPostsByCategory, setPostsSorting, vote })(CateogyHome);