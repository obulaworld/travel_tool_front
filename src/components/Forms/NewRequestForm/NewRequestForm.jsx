import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFiedset from './FormFieldsets/PersonalDetails';
import TravelDetailsFiedset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const user = props.user;

    this.defaultState = {
      values: {
        fullname: user ? user.UserInfo.name : '', // FIX: need to be refactor later
        gender: '',
        department: '',
        role: '',
        manager: '',
        origin: '',
        destination: '',
        otherDestination: '',
        departureDate: null,
        returnDate: null
      },
      errors: {},
      hasBlankFields: true
    };

    this.state = { ...this.defaultState };
  }

  // an onChange handler will be created by the Input component when it's rendered

  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateRequest } = this.props;
    const { values } = this.state;

    if (this.validate()) {
      // call create the request
      let data = { ...values };
      if (data.destination === 'Other')
        data.destination = data.otherDestination;

      delete data.otherDestination;
      handleCreateRequest(data);
    }
  };

  handleCancel = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;

    // check if to enforce otherDestination
    const requireOtherDestination = values.destination === 'Other';
    if (!requireOtherDestination) delete values['otherDestination'];

    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');

    // check if the form has any other blank fields
    // this will qualify the form as fully filled or not
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    // update the form's validity and return a boolean to use on Submit
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const {user} = this.props;

    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFiedset values={values} />
          <TravelDetailsFiedset values={values} />
          <hr />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
          />
        </form>
      </FormContext>
    );
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default NewRequestForm;
