import axios from 'axios';

const token = sessionStorage.getItem('token');

export default axios.create({
  headers: { Authorization: `Bearer ${token}` }
});
