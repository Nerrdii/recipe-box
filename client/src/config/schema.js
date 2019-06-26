import { array, number, object, string } from 'yup';

const schema = object().shape({
  name: string().required('Name is required'),
  servings: number()
    .required('Servings is required')
    .min(1, 'Servings cannot be less than 1'),
  ingredients: array()
    .of(string().required('Ingredient is required'))
    .required('At least one ingredient is required'),
  directions: array()
    .of(string().required('Direction is required'))
    .required('At least one direction is required')
});

export default schema;
