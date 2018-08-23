import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import './_header.scss';

class Header extends PureComponent{
  render(){
    const { toggleNewRequestModal } = this.props;
    return(
      <div className="new-requests">
        <div>
          <span className="requests">
            REQUESTS
          </span>
        </div>

        <div>
          <button onClick={toggleNewRequestModal} type="button" className="btn-new-request">
            <span className="new-request-button-text">
                New Request
            </span>
          </button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  toggleNewRequestModal: PropTypes.func.isRequired,
};

export default Header;
