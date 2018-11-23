import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WithLoadingRoleTable from '../../components/RoleTable';
import RolePanelHeader from '../../components/RolePanelHeader';
import Modal from '../../components/modal/Modal';
import { AddRoleForm } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  getRoleData,
  putRoleData,
  addRole
} from '../../redux/actionCreator/roleActions';
import './Role.scss';
import checkUserPermission from '../../helper/permissions';

export class Role extends Component {
  componentDidMount() {
    const { getRoleData } = this.props;
    getRoleData();
  }

  renderUserRolePanelHeader() {
    const { openModal } = this.props;
    return (
      <div className="rp-role__header">
        <RolePanelHeader openModal={openModal} />
      </div>
    );
  }

  renderRoles() {
    const { isLoading, roles, roleErrors } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRoleTable
          isLoading={isLoading}
          roles={roles}
          fetchRoleError={roleErrors}
        />
      </div>
    );
  }

  renderRoleForm() {
    const { roleErrors, closeModal, shouldOpen, modalType, addRole, isAddingRole } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="add-user"
        width="480px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="Add Role"
      >
        <AddRoleForm
          addRole={addRole}
          errors={roleErrors}
          closeModal={closeModal}
          addingRole={isAddingRole}
        />
      </Modal>
    );
  }

  renderUserRolePage() {
    return (
      <Fragment>
        {this.renderUserRolePanelHeader()}
        {this.renderRoles()}
      </Fragment>
    );
  }

  render() {
    const { getCurrentUserRole, history, isLoaded } = this.props;
    if (isLoaded) {
      const allowedRoles = ['Super Administrator'];
      checkUserPermission(history, allowedRoles, getCurrentUserRole );
    }
    return (
      <Fragment>
        {this.renderRoleForm()}
        {this.renderUserRolePage( )}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, role, user }) => ({
  ...user,
  ...modal.modal,
  ...role
});

Role.propTypes = {
  roles: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  getRoleData: PropTypes.func.isRequired,
  roleErrors: PropTypes.string,
  addRole: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  getCurrentUserRole: PropTypes.array.isRequired,
  history: PropTypes.shape({}).isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  isLoaded: PropTypes.bool,
  isAddingRole: PropTypes.bool
};

Role.defaultProps = {
  isLoading: false,
  roleErrors: '',
  modalType: '',
  isLoaded: false,
  isAddingRole: false
};

const actionCreators = {
  getRoleData,
  putRoleData,
  openModal,
  closeModal,
  addRole
};

export default connect(
  mapStateToProps,
  actionCreators
)(Role);
