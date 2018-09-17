
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageLink from '../../image-link/ImageLink';

class UserInfo extends Component {
  render() {
    const { requestData, user } = this.props;
    return (
      <div>
        <div className="modal__user-info">
          <ImageLink
            imageSrc={user.picture}
            altText="avatar"
            imageClass="modal__oval"
          />
          <span className="modal__text-size">
            {requestData && requestData.name}
          </span>
          <div className="modal__modal3">
            {requestData && requestData.role}
,
            {requestData && requestData.department}
          </div>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  requestData: PropTypes.object,
  user: PropTypes.object,
};

UserInfo.defaultProps = {
  requestData: {},
  user: {},
};

export default UserInfo;
