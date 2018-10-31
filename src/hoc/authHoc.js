import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'cookies-js';
import Utils from '../helper/Utils';
import { getUserData } from '../redux/actionCreator/userActions';
import { logoutUser } from '../helper/userDetails';

const history = PropTypes.shape({});
const user = PropTypes.object;

/* istanbul ignore next */
export default function(ComposedComponent) {
  /* istanbul ignore next */
  class Authenticate extends Component {
    componentDidMount() {
      const token = Cookies.get('jwt-token');
      const { history } = this.props;
      if(token) {
        this.verifyToken(token);
      } else {
        return logoutUser(history, 'No Token');
      }
    }

    verifyToken(token) {
      const { history, getUserData, user } = this.props;
      const decodedToken = Utils.verifyToken(token);
      const msg = 'Invalid Token';
      if(!decodedToken) return logoutUser(history, msg);
      const { exp } = decodedToken;
      Utils.isExpired(exp) && logoutUser(history, msg);
      !Utils.isExpired(exp) && getUserData(user.UserInfo.id);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    history: history.isRequired,
    user: user.isRequired,
    getUserData: PropTypes.func.isRequired
  };

  const mapStateToProps = ({ auth }) => ({ ...auth });
  return withRouter(connect(mapStateToProps, { getUserData })(Authenticate));
}
