
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageLink from '../../image-link/ImageLink';
import Oval2 from '../../../images/Oval2.png';

class RequestApproval extends Component {
  render() {
    const { requestData } = this.props;
    const { status } = requestData;
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
          <span className="modal__user-name">
            {requestData && requestData.manager}
          </span>
          <span className="modal__approval-status">
            {`${status && status.toLowerCase()} your travel request.`}
          </span>
          <span className="modal__hours-status">
           5 hours ago
          </span>
        </span>
      </div>
    );
  }
}

RequestApproval.propTypes = {
  requestData: PropTypes.object
};

RequestApproval.defaultProps = {
  requestData: {}
};

export default RequestApproval;
