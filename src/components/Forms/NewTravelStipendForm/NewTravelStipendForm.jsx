import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import TravelStipendFieldset from './FormFieldsets/TravelStipendDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewTravelStipendForm.scss';

class NewTravelStipendForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        center: '',
        stipend: '',
      },
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  handleSubmit =  event => {
    event.preventDefault();
    const { handleCreateTravelStipend, history } = this.props;
    let { values } = this.state;
    handleCreateTravelStipend(values, history);
   
  };

  renderTravelStipendFieldset = () => {
    const { values } = this.state;
    const { centers } = this.props;
    return (
      <TravelStipendFieldset
        centers={centers}
        values={values}
        onChangeInput={this.onChangeInput}
        value="245px"
      />
    );
  };

  renderForm = () => {
    const { errors, values, hasBlankFields, selection} = this.state;
    const { closeModal, travelStipends } = this.props;
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderTravelStipendFieldset()}
          <SubmitArea
            onCancel={closeModal}
            travelStipends={travelStipends} 
            hasBlankFields={hasBlankFields}
            selection={selection}
            send="Add Stipend" />
        </form>
      </FormContext>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

NewTravelStipendForm.propTypes = {
  closeModal: PropTypes.func,
  centers: PropTypes.array,
  travelStipends: PropTypes.object,
  handleCreateTravelStipend: PropTypes.func.isRequired,
  history: PropTypes.object
};

NewTravelStipendForm.defaultProps = {
  centers: [],
  closeModal: null,
  travelStipends: {},
  history: {
    push : () => {}
  }
};

export default NewTravelStipendForm;
