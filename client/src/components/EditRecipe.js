import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Field, FieldArray, Form } from 'formik';
import ErrorMessage from './ErrorMessage';

import schema from '../config/schema.js';

class EditRecipe extends Component {
  state = {
    name: '',
    description: '',
    servings: 0,
    ingredients: [],
    directions: []
  };

  handleSubmit(values, e, formApi) {
    fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    this.getRecipe();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== null) {
      return true;
    }
  }

  getRecipe() {
    const _id = this.props.match.params.id;

    fetch(`/api/recipes/${_id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          description: data.description,
          servings: data.servings,
          ingredients: data.ingredients,
          directions: data.directions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: this.state.name,
          description: this.state.description,
          servings: this.state.servings,
          ingredients: this.state.ingredients,
          directions: this.state.directions
        }}
        enableReinitialize={true}
        onSubmit={values => {
          const _id = this.props.match.params.id;

          fetch(`/api/recipes/${_id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).catch(err => console.log(err));

          this.props.history.push(`/recipes/${_id}`);
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
          <Form>
            <br />
            <Link
              to={`/recipes/${this.props.match.params.id}`}
              className="btn grey">
              Cancel
            </Link>
            <h1>Edit Recipe</h1>
            <div className="col s12">
              <div className="input-field">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="name">Name</label>
                {touched.name && errors.name && (
                  <div className="chip red">{errors.name}</div>
                )}
              </div>
              <div className="input-field">
                <Field
                  type="text"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-field">
                <Field
                  type="number"
                  name="servings"
                  id="servings"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="servings">Servings</label>
              </div>
              <h4>Ingredients</h4>
              <FieldArray
                name="ingredients"
                id="ingredients"
                render={arrayHelpers => {
                  return values.ingredients && values.ingredients.length > 0 ? (
                    values.ingredients.map((ingredient, index) => (
                      <div className="input-field" key={index}>
                        <Field
                          type="text"
                          name={`ingredients.${index}`}
                          id={`ingredients.${index}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name={`ingredients.${index}`} />
                        <label htmlFor={`ingredients.${index}`}>
                          Ingredient
                        </label>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => arrayHelpers.remove(index)}>
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => arrayHelpers.insert(index + 1, '')}>
                          Add
                        </button>
                      </div>
                    ))
                  ) : (
                    <div>
                      <ErrorMessage name="ingredients" />
                      <button
                        type="button"
                        className="btn"
                        onClick={() => arrayHelpers.push('')}>
                        Add an Ingredient
                      </button>
                    </div>
                  );
                }}
              />
              <h4>Directions</h4>
              <FieldArray
                name="directions"
                render={arrayHelpers => (
                  <div>
                    {values.directions && values.directions.length > 0 ? (
                      values.directions.map((direction, index) => (
                        <div className="input-field" key={index}>
                          <Field
                            type="text"
                            name={`directions.${index}`}
                            id={`directions.${index}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage name={`directions.${index}`} />
                          <label htmlFor={`directions.${index}`}>
                            Direction
                          </label>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => arrayHelpers.remove(index)}>
                            Remove
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => arrayHelpers.insert(index + 1, '')}>
                            Add
                          </button>
                        </div>
                      ))
                    ) : (
                      <div>
                        <ErrorMessage name="directions" />
                        <button
                          type="button"
                          className="btn"
                          onClick={() => arrayHelpers.push('')}>
                          Add a Direction
                        </button>
                      </div>
                    )}
                  </div>
                )}
              />
              <br />
              <br />
              <button
                type="button"
                className="btn grey"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}>
                Reset
              </button>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Submit
              </button>
              <br />
              <br />
            </div>
          </Form>
        )}
      />
    );
  }
}

export default withRouter(EditRecipe);
