import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NotFound.scss';
import notFoundImage from '../../../images/travela-404.png';


class NotFound extends Component {
  render() {
    const { redirectLink } = this.props;
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
            <Link to={redirectLink} className="button" href={redirectLink}>
                Click here to go back
            </Link>
          </center>
        </div>
      </div>
    );
  }
}
NotFound.propTypes = {
  redirectLink: PropTypes.string
};

NotFound.defaultProps = {
  redirectLink: '/requests'
};

export default NotFound;
