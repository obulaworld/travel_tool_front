import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FormContext } from '../../components/Forms/FormsAPI';
import PersonalDetailsFieldset from '../../components/Forms/NewRequestForm/FormFieldsets/PersonalDetails';
import SubmitArea from '../../components/Forms/NewRequestForm/FormFieldsets/SubmitArea';
import '../../components/Forms/NewRequestForm/NewRequestForm.scss';
import './UserProfile.scss';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import ProfileForm from '../../components/Forms/ProfileForm';
import Base from '../Base';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';

class UserProfile extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { fetchRoleUsers } = this.props;
    fetchRoleUsers(53019);
  }

  render() {
    const { manager, updateUserProfile, user } = this.props;

    return (
      <Fragment>
        <h1>
          PROFILE
        </h1>
        <div className="main">
          <div className="main--user_profile">
            <ProfileForm
              managers={manager}
              updateUserProfile={updateUserProfile}
              user={user}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

UserProfile.defaultProps = {
  manager: [],
};

export const mapStateToProps = ({ user,role, }) => ({
  ...user,
  ...role
});

const actionCreators = {
  updateUserProfile,
  fetchRoleUsers,
};
export default connect(
  mapStateToProps,
  actionCreators
)(UserProfile);
