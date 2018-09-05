import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserData } from '../redux/actionCreator/userActions';

const history = PropTypes.shape({});
const user = PropTypes.object;
const isAuthenticated = PropTypes.bool;

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      const { isAuthenticated, history, getUserData, user } = this.props;
      isAuthenticated ? getUserData(user.UserInfo.id) : null;
      !isAuthenticated ? history.push('/') : null;
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    history: history.isRequired,
    isAuthenticated: isAuthenticated.isRequired,
    user: user.isRequired,
    getUserData: PropTypes.func.isRequired
  };

  const mapStateToProps = ({ auth }) => ({
    ...auth
  });

  return withRouter(
    connect(
      mapStateToProps,
      { getUserData }
    )(Authenticate)
  );
}
