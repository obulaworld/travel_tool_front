import React, { Component } from 'react';
import andelaLogo from '../../images/andela-logo.svg';
import cover from '../../images/cover.svg';
import symbolG from '../../images/Google-white.svg';
import videoSymbol from '../../images/video.svg';
import fileSymbol from '../../images/file.svg';

import './Login.scss';
import TextLink from '../../components/text-link/TextLink';

class Login extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout login-page">
        <div className="mdl-layout__content">
          <div className="mdl-grid mdl-grid--no-spacing">

            {/* Add title and login button on the login page */}
            <div className="mdl-cell mdl-cell--5-col">

              <img src={andelaLogo} alt="Andela Logo" className="login-page__andela-logo" />

              <p className="login-page__travel-request-text">
                  Travel Requests Made Easier
              </p>

              <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn">
                <img src={symbolG} alt="Google Symbol" className="login-page__google-white" />
                <span className="login-page__login-to-get-started-text">
                 Login to Get Started
                </span>
              </button>

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
              <img src={cover} alt="Road map" className="login-page__landing-page-map" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
