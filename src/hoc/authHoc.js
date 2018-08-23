import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const history = PropTypes.shape({});
const user = PropTypes.object;
const isAuthenticated = PropTypes.bool;

export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount(){
      const { isAuthenticated, history } = this.props;
      if(!isAuthenticated){
        history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }


  Authenticate.propTypes = {
    history: history.isRequired,
    isAuthenticated: isAuthenticated.isRequired,
    user: user.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

  return withRouter(connect(mapStateToProps)(Authenticate));
}
