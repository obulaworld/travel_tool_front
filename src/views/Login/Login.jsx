import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrentUser } from '../../redux/actionCreator';
import travelaLogo from '../../images/travela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import videoSymbol from '../../images/video.svg';
import fileSymbol from '../../images/file.svg';
import './Login.scss';
import TextLink from '../../components/text-link/TextLink';
import { authenticationMessage } from '../../helper/toast';
import Button from '../../components/buttons/Buttons';

export class Login extends Component {
  componentDidMount() {
    this.authenticated();
  }

    authenticated = () => {
      const { isAuthenticated, history, setCurrentUser } = this.props;
      if (isAuthenticated) {
        history.push('/requests');
        authenticationMessage();
      }
      setCurrentUser();
    };

    login() {
      const url = `${
        process.env.REACT_APP_ANDELA_AUTH_HOST
      }/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`;
      window.location.replace(url);
    }

    render() {
      return (
        <div className="mdl-layout mdl-js-layout login-page">
          <div className="mdl-layout__content">
            <div className="mdl-grid mdl-grid--no-spacing">
              {/* Add title and login button on the login page */}
              <div className="mdl-cell mdl-cell--5-col">
                <img
                  src={travelaLogo}
                  alt="Andela Logo"
                  className="login-page__andela-logo"
                />

                <p className="login-page__travel-request-text">
                    Travel Requests Made Easier
                </p>
                <Button
                  id="login"
                  onClick={this.login} 
                  imageSrc={symbolG} altText="Google Symbol" imageClass="login-page__google-white" buttonType="button"
                  buttonClass="mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn">
                  <span className="login-page__login-to-get-started-text">
                    Login to Get Started
                  </span>
                </Button>

                {/* Add text link on the login page */}

                <TextLink
                  imageSrc={videoSymbol}
                  textLinkClass="login-page__how-to-book-a-trip-link"
                  textClass="login-page__how-to-book-a-trip-text"
                  altText="Video Symbol"
                  text="How to book a trip"
                />

                <TextLink
                  imageSrc={fileSymbol}
                  textLinkClass="login-page__andela-travel-policy-link"
                  textClass="login-page__andela-travel-policy"
                  altText="File Symbol"
                  text="Andela travel policy"
                />

              </div>

              {/* Add a road map on the login page */}
              <div className="mdl-cell mdl-cell--7-col">
                <img
                  src={cover}
                  alt="Road map"
                  className="login-page__landing-page-map"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps,{ setCurrentUser })(Login);
