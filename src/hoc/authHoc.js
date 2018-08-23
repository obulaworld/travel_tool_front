import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

  return withRouter(connect(mapStateToProps)(Authenticate));
}
