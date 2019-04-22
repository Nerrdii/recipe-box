import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik, Field, FieldArray, Form as FormikForm } from 'formik';
import ErrorMessage from './ErrorMessage';
import schema from '../config/schema.js';

class RecipeForm extends Component {
  renderFieldArray = (values, field, label, handleChange, handleBlur) => {
    return (
      <FieldArray
        name={field}
        id={field}
        render={arrayHelpers => (
          <React.Fragment>
            <div className="d-flex">
              <h4 className="mr-3">{label}s</h4>
              <Button
                type="button"
                variant="primary"
                className="mb-3"
                onClick={() => arrayHelpers.push('')}>
                Add
              </Button>
            </div>
            {values && values.length > 0 ? (
              values.map((v, index) => (
                <Form.Group key={index}>
                  <Form.Label htmlFor={`${field}.${index}`}>
                    {label} #{index + 1}
                  </Form.Label>
                  <InputGroup>
                    <Field
                      type="text"
                      name={`${field}.${index}`}
                      id={`${field}.${index}`}
                      className="form-control"
                      values={values[index]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <ErrorMessage name={`${field}.${index}`} />
                </Form.Group>
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
    return (
      <Formik
        initialValues={this.props.initialValues}
        enableReinitialize={true}
        onSubmit={values => this.props.onSubmit(values)}
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
          <FormikForm className="my-4">
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
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
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description</Form.Label>
              <Field
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="servings">Servings</Form.Label>
              <Field
                type="number"
                name="servings"
                id="servings"
                className="form-control"
                value={values.servings}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
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
              {this.props.cancelLink}
              <div className="float-right">
                <Button
                  type="button"
                  variant="secondary"
                  className="mr-3"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}>
                  Reset
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
          </FormikForm>
        )}
      />
    );
  }
}

export default RecipeForm;
