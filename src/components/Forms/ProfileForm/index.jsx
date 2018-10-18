import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import ProfileDetails from './FormFieldsets/ProfileDetails';
import './ProfileForm.scss';
import Validator from '../../../validator';

// TODO: Create your own meta data.
import * as formMetadata from '../FormsMetadata/NewProfileMetadata/index';


class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('name');
    const gender = localStorage.getItem('gender');
    const department = localStorage.getItem('department');
    const role = localStorage.getItem('role');
    const manager = localStorage.getItem('manager');

    this.defaultState = {
      values: {
        name: Validator.databaseValueValidator(user), // FIX: need to be refactor later
        gender: Validator.databaseValueValidator(gender),
        department: Validator.databaseValueValidator(department),
        role: Validator.databaseValueValidator(role),
        manager: Validator.databaseValueValidator(manager),
      },
      errors: {},
      hasBlankFields: true,
      hideNotificationPane: true,
      hideSideBar: false,
      openSearch: false,
      selectedLink: 'settings page',
      hideOverlay: false
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  submitProfileForm = event => {
    event.preventDefault();
    const { updateUserProfile, user } = this.props;
    const userId = user.UserInfo.id;
    const { values } = this.state;
    if (this.validate) {
      let data = { ...values };
      data.passportName = data.name;
      data.occupation = data.role;
      updateUserProfile(data, userId, true);
    }
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { managers } = this.props;

    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={this.submitProfileForm} className="new-profile">
          <ProfileDetails values={values} managers={managers} hasBlankFields={hasBlankFields} />
          {hasBlankFields ? (
            <div className="submit-area">
              <button type="submit" disabled={hasBlankFields} className="bg-btn bg-btn--inactive">
                Save Changes
              </button>
            </div>) :
            (
              <div className="submit-area">
                <button type="submit" className="bg-btn bg-btn--active">
                Save Changes
                </button>
                <button type="button" className="bg-btn bg-btn--inactive" onClick={this.handleClearForm} id="btn-cancel">
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
};
ProfileForm.defaultProps = {
  managers: [],
};

export default ProfileForm;
