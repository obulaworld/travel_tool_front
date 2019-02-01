import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, {
  FormContext,
  getDefaultBlanksValidatorFor
} from '../FormsAPI';
import ProfileDetails from './FormFieldsets/ProfileDetails';
import './ProfileForm.scss';
import Validator from '../../../validator';

// TODO: Create your own meta data.
import * as formMetadata from '../FormsMetadata/NewProfileMetadata/index';

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        gender: '',
        department: '',
        role: '',
        manager: '',
        location: ''
      },
      userProfile: {

      },
      errors: {},
      hasBlankFields: true,
      hideNotificationPane: true,
      hideSideBar: false,
      openSearch: false,
      selectedLink: 'settings page',
      hideOverlay: false,
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentWillReceiveProps(nextProps){
    const { userData } = nextProps;

    if(userData !== undefined){
      const { passportName, gender, department, occupation, manager, location } = userData;
      this.setState((prevState) => ({
        ...prevState,
        values: {
          name: Validator.databaseValueValidator(passportName),
          gender: Validator.databaseValueValidator(gender),
          department: Validator.databaseValueValidator(department),
          role: Validator.databaseValueValidator(occupation),
          manager: Validator.databaseValueValidator(manager),
          location: Validator.databaseValueValidator(location)
        }
      }));
      this.setState((prevState => ( { userProfile: prevState.values})));
    }
  }

  submitProfileForm = event => {
    event.preventDefault();
    const { updateUserProfile, user} = this.props;

    const userId = user.UserInfo.id;
    const { values } = this.state;
    if (this.validate) {
      let data = { ...values };
      data.passportName = data.name;
      data.occupation = data.role;

      updateUserProfile(data, userId, true);
      this.setState({hasBlankFields: true});
      localStorage.setItem('location', values.location);
    }
  };

  handleClearForm = () => {
    this.setState((prevState => ({
      ...this.defaultState,
      values: {...prevState.userProfile},
      userProfile: prevState.userProfile
    })));
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { managers, centers } = this.props;
    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={this.submitProfileForm} className="new-profile">
          <ProfileDetails
            values={values}
            managers={managers}
            centers={centers} />
          {hasBlankFields? (
            <div className="submit-area">
              <button
                type="submit"
                disabled={hasBlankFields}
                className="profile-bg-btn bg-btn bg-btn--inactive">
                Save Changes
              </button>
            </div>
          ) : (
            <div className="submit-area ">
              <button type="submit" className="bg-btn bg-btn--active">
                Save Changes
              </button>
              <button
                type="button" 
                className="bg-btn bg-btn--inactive" 
                onClick={this.handleClearForm} id="btn-cancel">
                Cancel
              </button>
            </div>
          )}
        </form>
      </FormContext>
    );
  }
}

ProfileForm.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  managers: PropTypes.array,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  centers: PropTypes.array
};
ProfileForm.defaultProps = {
  managers: [],
  centers: []
};

export default ProfileForm;

