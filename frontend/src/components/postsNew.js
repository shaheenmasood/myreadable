import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";
const uuidv1 = require('uuid/v1')

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    const data = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: values.title,
      body: values.content,
      author: values.author,
      category: values.category,
      voteScore: 0,
      deleted: false
    }
    this.props.createPost(data)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Author"
            name="author"
            component={this.renderField}
          />
          <div><label>Category</label></div>
          <Field
            name="category" 
            component='select'>
            <option value="react" selected>react</option>
            <option value="redux">redux</option>
            <option value="udacity">udacity</option>
          </Field>
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));