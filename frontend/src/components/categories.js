import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions";

class Categories extends Component {
  
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div>
        <h3>Categories</h3>
        <ul className="list-group">
          <li>
            <Link to='/'>All</Link>
          </li>
          {this.props.categories &&
            this.props.categories.length > 0 &&
            this.props.categories.map(category =>
              <li key={category.path}>
                <Link to={`/${category.name}`}>
                  {category.name}
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories
})

export default connect(mapStateToProps, { fetchCategories })(Categories);