import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WithLoadingRoleTable from '../../components/RoleTable';
import RolePanelHeader from '../../components/RolePanelHeader';
import Modal from '../../components/modal/Modal';
import { NewUserRoleForm } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  getRoleData,
  putRoleData
} from '../../redux/actionCreator/roleActions';
import './Role.scss';

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
    const { isLoading, getRole, roleErrors } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRoleTable
          isLoading={isLoading}
          role={getRole.result}
          fetchRoleError={roleErrors}
        />
      </div>
    );
  }

  renderRoleForm() {
    const { roleErrors, closeModal, shouldOpen, modalType, putRoleData, getRoleData } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        width="600px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="Add User Role"
      >
        <NewUserRoleForm
          handleUpdateRole={putRoleData}
          errors={roleErrors}
          closeModal={closeModal}
          getRoleData={getRoleData}
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
    const { getCurrentUserRole, history } = this.props;
    const isAdmin = getCurrentUserRole && getCurrentUserRole;
    if (isAdmin && isAdmin != 'Super Administrator') {
      history.push('/');
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
  getRole: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  getRoleData: PropTypes.func.isRequired,
  roleErrors: PropTypes.string,
  putRoleData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  getCurrentUserRole: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string
};

Role.defaultProps = {
  isLoading: false,
  roleErrors: '',
  modalType: ''
};

const actionCreators = {
  getRoleData,
  putRoleData,
  openModal,
  closeModal
};

export default connect(
  mapStateToProps,
  actionCreators
)(Role);
