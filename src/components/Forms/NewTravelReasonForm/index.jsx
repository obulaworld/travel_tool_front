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

  componentDidMount() {
    this.setEditValues(this.props);
  }

  setEditValues = ({ editing, travelReason : { editReason }}) => {
    if (editing) {
      const { title, description } = editReason;
      this.setState(
        {
          values: { title, description }
        });
    }
  };

  validateLength = field => {
    let { values, optionalFields } = this.state;
    const { editing, travelReason: { editReason } } = this.props;

    let tempErrorsObject = {
      title: '',
      description: ''
    };

    let hasBlankFields = false;

    switch (field) {
    case 'title':
      values[field].length === 0 ?
        (tempErrorsObject.title = 'This field is required')
        : null;
      values[field].length >= 18 ? (
        tempErrorsObject.title = 'Titles can only be 18 characters long')
        : null;
      values.title = values.title.slice(0,18);
      break;
    case 'description':
      values[field].length >= 140 ?
        (tempErrorsObject.description = 'Descriptions can only be 140 characters long')
        : null;
      values.description = values.description.slice(0, 140);
      break;
    default:
      break;
    }

    hasBlankFields = Object.keys(values).some(
      key => !values[key] && !optionalFields.includes(key)
    );

    this.setState(prevState => {
      return { ...prevState, errors: { ...tempErrorsObject }, hasBlankFields };
    });

    if ( editing && !hasBlankFields && editReason.title && editReason.description ){
      const title = values.title ? values.title.toLowerCase() : '';
      const description = values.description ? values.description.toLowerCase() : '';
      hasBlankFields = title === editReason.title.toLowerCase() &&
        description === editReason.description.toLowerCase();
    }

    return !hasBlankFields;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { createNewTravelReason,
      editing, editTravelReason ,
      travelReason: { editReason}} = this.props;
    let { values } = this.state;
    if (editing) {
      editTravelReason({id: editReason.id, ...values});
    }else {
      createNewTravelReason(values);
    }
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { closeModal, travelReason, send } = this.props;
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
            send={send}
          />
        </form>
      </FormContext>
    );
  }
}

NewTravelReasonForm.propTypes = {
  closeModal: PropTypes.func,
  createNewTravelReason: PropTypes.func,
  editTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
  send: PropTypes.string,
  editing: PropTypes.bool
};

NewTravelReasonForm.defaultProps = {
  closeModal: null,
  createNewTravelReason: null,
  editTravelReason: null,
  travelReason: {},
  send: 'Add Reason',
  editing: false
};
