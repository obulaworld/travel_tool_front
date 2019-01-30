import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import '../../components/Forms/NewRequestForm/NewRequestForm.scss';
import './UserProfile.scss';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import ProfileForm from '../../components/Forms/ProfileForm';
import Base from '../Base';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getUserData } from '../../redux/actionCreator/userActions';
import { fetchCenters } from '../../redux/actionCreator/centersActions';


class UserProfile extends Base {

  componentDidMount() {
    const {
      fetchRoleUsers,
      fetchCenters,
    } = this.props;
    
    fetchRoleUsers(53019);
    fetchCenters();
  }

  render() {
    const { roleUsers, updateUserProfile, user,
      fetchUserData, centers } = this.props;
    return (
      <Fragment>
        <h1>PROFILE</h1>
        <div className="main">
          <div className="main--user_profile">
            <ProfileForm
              managers={roleUsers}
              updateUserProfile={updateUserProfile}
              userData={fetchUserData && fetchUserData.result}
              user={user}
              centers={centers && centers.centers}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

UserProfile.defaultProps = {
  manager: []
};

export const mapStateToProps = ({ user, role, centers}) => ({
  ...role,
  centers,
  fetchUserData: user.getUserData
});

const actionCreators = {
  updateUserProfile,
  fetchRoleUsers,
  getUserData,
  fetchCenters
};

export default connect(
  mapStateToProps,
  actionCreators
)(UserProfile);
