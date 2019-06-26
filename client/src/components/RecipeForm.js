import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik, FieldArray, ErrorMessage } from 'formik';
import schema from '../config/schema.js';

const RecipeForm = ({ initialValues, cancelLink, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={values => onSubmit(values)}
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
      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.name && errors.name}
          />
          <Form.Control.Feedback type="invalid">
            <ErrorMessage name="name" />
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
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
          <Form.Control
            type="number"
            name="servings"
            id="servings"
            className="form-control"
            value={values.servings}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.servings && errors.servings}
          />
          <Form.Control.Feedback type="invalid">
            <ErrorMessage name="servings" />
          </Form.Control.Feedback>
        </Form.Group>
        <FieldArray
          name="ingredients"
          id="ingredients"
          render={arrayHelpers => {
            const { ingredients } = values;

            return (
              <React.Fragment>
                <div className="d-flex">
                  <h4 className="mr-3">Ingredients</h4>
                  <Button
                    type="button"
                    variant="primary"
                    className="mb-3"
                    onClick={() => arrayHelpers.push('')}>
                    Add
                  </Button>
                </div>
                {ingredients && ingredients.length > 0 ? (
                  ingredients.map((ingredient, index) => (
                    <Form.Group key={index}>
                      <Form.Label htmlFor={`ingredients[${index}]`}>
                        Ingredient #{index + 1}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name={`ingredients[${index}]`}
                          id={`ingredients[${index}]`}
                          className="form-control"
                          value={ingredient}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.ingredients &&
                            touched.ingredients[index] &&
                            errors.ingredients &&
                            errors.ingredients[index]
                          }
                        />
                        <InputGroup.Append>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => arrayHelpers.remove(index)}>
                            &times;
                          </Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                          <ErrorMessage name={`ingredients.${index}`} />
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  ))
                ) : (
                  <Alert variant="danger">
                    <ErrorMessage name="ingredients" />
                  </Alert>
                )}
              </React.Fragment>
            );
          }}
        />
        <FieldArray
          name="directions"
          id="directions"
          render={arrayHelpers => {
            const { directions } = values;

            return (
              <React.Fragment>
                <div className="d-flex">
                  <h4 className="mr-3">Directions</h4>
                  <Button
                    type="button"
                    variant="primary"
                    className="mb-3"
                    onClick={() => arrayHelpers.push('')}>
                    Add
                  </Button>
                </div>
                {directions && directions.length > 0 ? (
                  directions.map((direction, index) => (
                    <Form.Group key={index}>
                      <Form.Label htmlFor={`directions[${index}]`}>
                        Direction #{index + 1}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name={`directions[${index}]`}
                          id={`directions[${index}]`}
                          className="form-control"
                          values={direction}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.directions &&
                            touched.directions[index] &&
                            errors.directions &&
                            errors.directions[index]
                          }
                        />
                        <InputGroup.Append>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => arrayHelpers.remove(index)}>
                            &times;
                          </Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                          <ErrorMessage name={`directions.${index}`} />
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  ))
                ) : (
                  <Alert variant="danger">
                    <ErrorMessage name="directions" />
                  </Alert>
                )}
              </React.Fragment>
            );
          }}
        />
        <div className="mt-5">
          {cancelLink}
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
      </Form>
    )}
  />
);

export default RecipeForm;
