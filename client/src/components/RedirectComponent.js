import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { login } from '../actions/userActions';

const SuccessComponent = props => {
  const { token } = queryString.parse(props.location.search);
  props.login(token);

  return <div>Redirecting...</div>;
};

export default connect(
  null,
  { login }
)(SuccessComponent);
