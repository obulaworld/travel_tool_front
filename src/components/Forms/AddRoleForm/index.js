import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import AddRoleFields from './FormFieldSets/AddRoleFields';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';

class AddRoleForm extends PureComponent {
  constructor(props) {
    super(props);
    const defaultValues = {
      roleName: '',
      description: ''
    };
    this.defaultState = {
      values: defaultValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }

  handleSubmit = event => {
    const { values } = this.state;
    event.preventDefault();
    const { addRole } = this.props;
    if (this.validate()) {
      addRole(values);
    }
  };

  handleCancel = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    if (!values[field]) {
      errors[field] = 'This field is required';
    } else {
      errors[field] = '';
    }
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { addingRole } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        {addingRole && (
          <h5
            id="add-role-status"
            style={{ display: 'flex', justifyContent: 'center', fontFamily: 'DIN Pro' }}
          >
          Adding role...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request" id="add-role-form">
          <AddRoleFields
            values={values}
          />
          <hr />
          <SubmitArea
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send="Add Role"
          />
        </form>
      </FormContext>
    );
  }
}

AddRoleForm.propTypes = {
  addRole: PropTypes.func.isRequired,
  addingRole: PropTypes.bool,
};

AddRoleForm.defaultProps = {
  addingRole: false,
};

export default AddRoleForm;
