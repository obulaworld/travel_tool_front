import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';

class NewUserRoleForm extends PureComponent {
  defaultState = {
    values: {
      email: '',
      roleName: ''
    },
    errors: {},
    hasBlankFields: true
  };

  state = { ...this.defaultState };

  componentWillUnmount() {
    const { getRoleData } = this.props;
    this.handleCancel();
    getRoleData();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleUpdateRole } = this.props;
    const { values } = this.state;
    if (this.validate()) {
      let data = values;
      handleUpdateRole(data);
    }
  };

  handleCancel = () => {
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
    const { updatingRole } = this.props;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        {updatingRole && (
          <h5 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'DIN Pro' }}
          >
          Updating role...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset values={values} value="232px" />
          <hr />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send="Submit"
          />
        </form>
      </FormContext>
    );
  }
}

NewUserRoleForm.propTypes = {
  handleUpdateRole: PropTypes.func.isRequired,
  updatingRole: PropTypes.bool,
  getRoleData: PropTypes.func.isRequired,
};

NewUserRoleForm.defaultProps = {
  updatingRole: false,
};

export default NewUserRoleForm;
