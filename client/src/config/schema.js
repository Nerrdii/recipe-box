import { object, array, string } from 'yup';

const schema = object().shape({
  name: string().required('Name is required'),
  ingredients: array()
    .of(string().required('Ingredient is required'))
    .required('Ingredients are required'),
  directions: array()
    .of(string().required('Direction is required'))
    .required('Directions are required')
});

export default schema;
