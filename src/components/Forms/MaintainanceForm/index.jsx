import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, { FormContext } from '../FormsAPI';
import MaintainanceFieldSets from './FormFieldsets/maintaince';
import Validator from '../../../validator';
import './maintainance.scss';

// TODO: Create your own meta data.
import * as formMetadata from '../FormsMetadata/NewProfileMetadata/index';


class MaintainceForm extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultState = {
      values: {
        reason: '',
        maintainanceStart: '',
        maintainanceEnd: ''
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
  }

  submitMaintainanceData = event => {
    event.preventDefault();
    const { values } = this.state;
    const {addmaintenanceRecord, id, closeModal, showId, status} = this.props;
    if (this.validate) {
      let data = { ...values };
      data.start = data.maintainanceStart;
      data.end = data.maintainanceEnd;
      addmaintenanceRecord(data, id);
      showId(id, status);
      closeModal(true, 'new model');
    }
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { managers } = this.props;

    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={this.submitMaintainanceData} className="maintainance-form">
          <MaintainanceFieldSets values={values} hasBlankFields={hasBlankFields} />
          <div className="maintainence-line" />
          <div className="maintainence-submit-area">
            {hasBlankFields ? (
              <div className="maintainence-submit-area_false">
                <button type="submit" disabled={hasBlankFields} className="bg-btn bg-btn--inactive">
                Save Changes
                </button>
              </div>) :
              (
                <div className="maintainence-submit-area">
                  <button type="button" className="bg-btn bg-btn--inactive btn-cancel" onClick={this.handleClearForm} id="btn-cancel">
                Cancel
                  </button>
                  <button type="submit" className="bg-btn bg-btn--active">
                Save Changes
                  </button>
                </div>
              )}
          </div>

        </form>
      </FormContext>
    );
  }
}

MaintainceForm.propTypes = {
  managers: PropTypes.array,
  addmaintenanceRecord: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  showId: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
MaintainceForm.defaultProps = {
  managers: [],
};

export default MaintainceForm;
