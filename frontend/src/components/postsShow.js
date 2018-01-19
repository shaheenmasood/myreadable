import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions";
import Comment from '../components/comment'

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  handleVote = (id, voteType) => {
    this.props.vote(id, voteType)
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

        alert(JSON.stringify(post.comments))

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <div>
          <h2>{post.title}</h2>
          <h4>Author: {post.author}</h4>
          <h4>Date: {new Date(post.timestamp).toDateString()}</h4>
          {post.category && <h4>Category: {post.category}</h4>}
          <p>{post.body}</p>
          <div>Vote Score: {post.voteScore}{' '}
            <a href="#"> <span className='glyphicon glyphicon-plus' onClick={() => this.handleVote(post.id, 'upVote')}></span></a>
            <a href="#"> <span className='glyphicon glyphicon-minus' onClick={() => this.handleVote(post.id, 'downVote')}></span></a>
          </div>
        </div>
        <div> <h3>Comments ({post.commentCount})</h3></div>
        {post.comments &&
        Object.values(post.comments)
          .filter(comment => !comment.deleted)
          .map(comment =>
            <Comment
              key={comment.id}
              id={comment.id}
              timestamp={comment.timestamp}
              body={comment.body}
              author={comment.author}
              parentId={comment.parentId}
              voteScore={comment.voteScore}
            />
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);