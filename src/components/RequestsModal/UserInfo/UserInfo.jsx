
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageLink from '../../image-link/ImageLink';

class UserInfo extends PureComponent {
  render() {
    const { requestData, user } = this.props;
    return (
      <div className="modal__user-info">
        <ImageLink
          imageSrc={user.picture}
          altText="avatar"
          imageClass="modal__oval"
        />
        <div>
          <div>
            {requestData && requestData.name}
          </div>
          <div className="user-role">
            {requestData && `${requestData.role}${', '}`}
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
