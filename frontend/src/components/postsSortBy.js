import React, { Component } from "react";
import { connect } from "react-redux";
import { setPostsSorting, SortOrder } from "../actions";

class PostsSortBy extends Component {


  handleSort = val => {
    this.props.setPostsSorting(val)
  }

  render() {
    return (
      <div>
        <h3>Sort Posts By</h3>
        <ul className="list-group">
          <li><a href="#" 
            onClick={() =>
              this.handleSort(
                this.props.sortBy === SortOrder.SCORE_ASCENDING ? SortOrder.SCORE_DESCENDING : SortOrder.SCORE_ASCENDING
              )}
          >Votes</a></li>
          <li><a href="#" 
            onClick={() =>
              this.handleSort(
                this.props.sortBy === SortOrder.DATE_ASCENDING ? SortOrder.DATE_DESCENDING : SortOrder.DATE_ASCENDING
              )}
          >Date</a></li>
        </ul>
      </div>
    )
  }
}

export default connect(null, { setPostsSorting })(PostsSortBy);