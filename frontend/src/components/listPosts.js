import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import PostsSortBy from './postsSortBy'
import Categories from './categories'
import { SortOrder } from "../actions"

import './App.css'

const renderPosts = (posts, sortBy, handleVote) => {
    return Object.values(posts)
    .filter(post => !post.deleted)
    .sort((a, b) => {
      switch (sortBy) {
        case SortOrder.SCORE_ASCENDING:
          return a.voteScore - b.voteScore
        case SortOrder.DATE_ASCENDING:
          return a.timestamp - b.timestamp
        case SortOrder.DATE_DESCENDING:
          return b.timestamp - a.timestamp
        default:
          return b.voteScore - a.voteScore
      }
    })
    .map(post => {
      if (post.title) {
        return (
          <li className="list-group-item" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3 style={{ marginBottom: 0 }}>
                {post.title}
              </h3>
            </Link>
            <div> Author: {post.author}</div>
            <div>Vote Score: {post.voteScore}{' '}
              <a href="#"> <span className='glyphicon glyphicon-plus' onClick={() => handleVote(post.id, 'upVote')}></span></a>
              <a href="#"> <span className='glyphicon glyphicon-minus' onClick={() => handleVote(post.id, 'downVote')}></span></a>
            </div>
            <div> Comments: {post.commentCount}</div>
            <span>
              <Link
                      to={{
                        pathname: `/${post.category}/${post.id}`,
                        state: { postEditorVisible: true }
                      }}
                    >
                      Edit
                    </Link>{' '}
                    /{' '}
                    <span
                      className='clickable'
                      onClick={() => this.deletePost(post.id)}
                    >
                      Delete
                    </span>
                      </span>
          </li>
        )
      }
    })
  } 

function ListPosts(props) {
  let header = 'Posts'
  if (props.cat) {
    header += ' from category : ' + props.cat;
  }
  return (
		  <div>
	        <div className="float-left-area">
	          <div><PostsSortBy sortBy={props.sortBy} /></div>
	          <div><Categories /></div>
	        </div>
	        <div className="float-right-area">
	          <h3>{header} (<Link to='/posts/new'>Add New</Link>)</h3>
	          {props.posts &&
	            <ul className="list-group">
	              {renderPosts(props.posts, props.sortBy, props.handleVote)}
	            </ul>
	          }
	        </div>
	      </div>	 
	  )
};

ListPosts.propTypes = {
  posts: PropTypes.object,
  sortBy: PropTypes.string.isRequired,
  handleVote: PropTypes.func.isRequired,
  cat: PropTypes.string
};

export default ListPosts;