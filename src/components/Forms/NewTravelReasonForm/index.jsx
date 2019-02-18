import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from './FormFieldsets/SubmitArea';
import TravelReasonFieldset from './FormFieldsets';

export default class NewTravelReasonForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        title: '',
        description: '',
      },
      errors: {},
      hasBlankFields: true,
      optionalFields: ['description']
    };
    this.state = { ...this.defaultState };
  }

  validateLength = field => {
    let { values, optionalFields } = this.state;

    let tempErrorsObject = {
      title: '',
      description: ''
    };

    let hasBlankFields = false;

    switch (field) {
    case 'title':
      values[field].length === 0 ? (tempErrorsObject.title = 'This field is required') : null;
      values[field].length >= 18 ? (tempErrorsObject.title = 'Titles can only be 18 characters long') : null;
      values.title = values.title.slice(0,18);
      break;
    case 'description':
      values[field].length >= 140 ? (tempErrorsObject.description = 'Descriptions can only be 140 characters long') : null;
      values.description = values.description.slice(0, 140);
      break;
    default:
      break;
    }

    hasBlankFields = Object.keys(values).some(key => !values[key] && !optionalFields.includes(key));

    this.setState(prevState => {
      return { ...prevState, errors: { ...tempErrorsObject }, hasBlankFields };
    });

    return !hasBlankFields;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { createNewTravelReason } = this.props;
    let { values } = this.state;
    await createNewTravelReason(values);
  }
  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { closeModal, travelReason } = this.props;
    return (
      <FormContext values={values} errors={errors} targetForm={this} validatorName="validateLength">
        <form onSubmit={this.handleSubmit} className="new-request">
          <TravelReasonFieldset
            value="232px"
          />
          <SubmitArea
            travelReason={travelReason}
            onCancel={closeModal}
            hasBlankFields={hasBlankFields}
            send="Add Reason"
          />
        </form>
      </FormContext>
    );
  }
}

NewTravelReasonForm.propTypes = {
  closeModal: PropTypes.func,
  createNewTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
};

NewTravelReasonForm.defaultProps = {
  closeModal: null,
  createNewTravelReason: null,
  travelReason: {},
};
