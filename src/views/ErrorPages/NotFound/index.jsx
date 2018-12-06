import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NotFound.scss';
import notFoundImage from '../../../images/travela-404.png';


class NotFound extends Component {
  handleNaviagation = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/requests');
  }
  render() {
    return (
      <div className="pageOverlay">
        <div className="notFoundBody">
          <div className="bg_404">
            <img src={notFoundImage} alt="page not found" /> 
          </div>
          <p>
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <center>
            <a className="button" href="/requests" onClick={this.handleNaviagation}>
              <i className="icon-home" />
              Click here to go back
            </a>
          </center>
        </div>
      </div>
    );
  }
}
NotFound.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default NotFound;
