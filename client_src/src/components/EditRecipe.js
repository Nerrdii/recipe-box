import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, FieldArray, Form } from "formik";
import ErrorMessage from "./ErrorMessage";
import API_ROOT from "./api";

import schema from "./schema";

class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ingredients: [],
      directions: []
    };
  }

  handleSubmit(values, e, formApi) {
    fetch(`${API_ROOT}/recipes`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "application/json"
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
    const id = this.props.match.params.id;

    fetch(`${API_ROOT}/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
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
          ingredients: this.state.ingredients,
          directions: this.state.directions
        }}
        enableReinitialize={true}
        onSubmit={values => {
          const id = this.props.match.params.id;

          fetch(`${API_ROOT}/recipes/${id}`, {
            method: "PUT",
            body: JSON.stringify(values),
            headers: new Headers({
              "Content-Type": "application/json"
            })
          }).catch(err => console.log(err));

          this.props.history.push(`/recipes/${id}`);
        }}
        validationSchema={schema}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          handleReset,
          dirty
        }) => (
          <Form>
            <br />
            <Link
              to={`/recipes/${this.props.match.params.id}`}
              className="btn grey"
            >
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
                {touched.name &&
                  errors.name && <div className="chip red">{errors.name}</div>}
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
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => arrayHelpers.insert(index + 1, "")}
                        >
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
                        onClick={() => arrayHelpers.push("")}
                      >
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
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => arrayHelpers.insert(index + 1, "")}
                          >
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
                          onClick={() => arrayHelpers.push("")}
                        >
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
                disabled={!dirty || isSubmitting}
              >
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
