import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, FieldArray, Form } from 'formik';
import ErrorMessage from './ErrorMessage';
import { updateRecipe } from '../actions/recipesActions';
import schema from '../config/schema.js';

class EditRecipe extends Component {
  renderFieldArray = (values, field, label, handleChange, handleBlur) => {
    return (
      <FieldArray
        name={field}
        id={field}
        render={arrayHelpers => (
          <React.Fragment>
            <div className="d-flex">
              <h4 className="mr-3">{label}s</h4>
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={() => arrayHelpers.push('')}>
                Add
              </button>
            </div>
            {values && values.length > 0 ? (
              values.map((v, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={`${field}.${index}`}>
                    {label} #{index + 1}
                  </label>
                  <div className="input-group">
                    <Field
                      type="text"
                      name={`${field}.${index}`}
                      id={`${field}.${index}`}
                      className="form-control"
                      values={values[index]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <ErrorMessage name={`${field}.${index}`} />
                </div>
              ))
            ) : (
              <ErrorMessage name={field} />
            )}
          </React.Fragment>
        )}
      />
    );
  };

  render() {
    const {
      _id,
      name,
      description,
      servings,
      ingredients,
      directions
    } = this.props.location.state;

    return (
      <Formik
        initialValues={{
          name,
          description,
          servings,
          ingredients,
          directions
        }}
        enableReinitialize={true}
        onSubmit={values => {
          this.props.updateRecipe(_id, {
            ...this.props.location.state,
            ...values
          });
        }}
        validationSchema={schema}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          handleReset,
          dirty
        }) => (
          <Form className="my-4">
            <h1 className="mt-3">Edit Recipe</h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && errors.name}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="servings">Servings</label>
              <Field
                type="number"
                name="servings"
                id="servings"
                className="form-control"
                value={values.servings}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {this.renderFieldArray(
              values.ingredients,
              'ingredients',
              'Ingredient',
              handleChange,
              handleBlur
            )}
            {this.renderFieldArray(
              values.directions,
              'directions',
              'Direction',
              handleChange,
              handleBlur
            )}
            <div className="mt-5">
              <Link to={`/recipes/${_id}`} className="btn btn-secondary">
                Cancel
              </Link>
              <div className="float-right">
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}>
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      />
    );
  }
}

export default connect(
  null,
  { updateRecipe }
)(EditRecipe);
