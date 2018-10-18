import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';

class NewUserRoleForm extends PureComponent {
  constructor(props) {
    super(props);
    const { role, userDetail } = this.props;
    const defaultValues = {
      email: userDetail ? userDetail.email : '',
      roleName: role,
    };
    const initialValues = role &&
    role.toLowerCase() === 'travel team member' ? {
        ...defaultValues,
        center: userDetail ? userDetail.centers[0].location : ''
      } : defaultValues;
    this.defaultState = {
      values: initialValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }
  componentDidMount() {
    const { role, fetchCenters } = this.props;
    if (role && role.toLowerCase() === 'travel team member') {
      fetchCenters();
    }
  }

  componentWillUnmount() {
    const { getRoleData } = this.props;
    this.handleCancel();
    getRoleData();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleUpdateRole, updateUserCenter, userDetail, myTitle } = this.props;
    const { values } = this.state;
    if (this.validate()) {
      let data = values;
      myTitle === 'Add User' ?  
        handleUpdateRole(data): 
        updateUserCenter(userDetail.id, data);
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
    const { updatingRole, role, centers, myTitle } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        {updatingRole && (
          <h5 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'DIN Pro' }}
          >
          Updating role...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            roleName={role}
            centers={centers}
            myTitle={myTitle}
          />
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
  centers: PropTypes.array.isRequired,
  myTitle: PropTypes.string.isRequired,
  updateUserCenter: PropTypes.func,
  fetchCenters: PropTypes.func,
  role: PropTypes.string.isRequired,
  userDetail:  PropTypes.object,
};

NewUserRoleForm.defaultProps = {
  updatingRole: false,
  updateUserCenter: ()=> {},
  fetchCenters: ()=> {},
  userDetail: {},

};

export default NewUserRoleForm;
