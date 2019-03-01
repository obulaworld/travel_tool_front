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
      hasBlankFields: true,
      isValidAmount: true
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

  handleShowEventError = (event) => {
    event.preventDefault();
    this.setState({ isValidAmount: false });
  }

  handleOnchange = (event) => {
    const { target: { value: amount } } = event;  
    this.setState(prevSate => {
      return {
        values: {
          ...prevSate.values,
          stipend: amount
        },
        errors: {},
        isValidAmount: (amount ? amount > 0 : true),
      };
    }, () => this.validate());
  }

  renderTravelStipendFieldset = (isEmpty) => {
    const { values, isValidAmount,  } = this.state;
    const { centers } = this.props;
    return (
      <TravelStipendFieldset
        centers={centers}
        values={values}
        isEmpty={isEmpty}
        handleShowEventError={this.handleShowEventError}
        onChangeAmountInput={this.handleOnchange}
        isValidAmount={isValidAmount}
        value="245px"
      />
    );
  };

  renderForm = () => {
    const { errors, values, 
      hasBlankFields, 
      selection, 
      errors: { 
        stipend 
      }, 
      isValidAmount 
    } = this.state;
    const { closeModal, travelStipends } = this.props;
    const isEmpty = stipend === 'This field is required';
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderTravelStipendFieldset(isEmpty)}
          <SubmitArea
            onCancel={closeModal}
            travelStipends={travelStipends} 
            hasBlankFields={hasBlankFields || !isValidAmount}
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
