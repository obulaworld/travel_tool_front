import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WithLoadingRoleDetailsTable from '../../components/RoleDetailsTable';
import PageHeader from '../../components/PageHeader';
import Modal from '../../components/modal/Modal';
import { NewUserRoleForm } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  fetchRoleUsers,
  putRoleData,
  deleteUserRole,
  hideDeleteRoleModal,
  showDeleteRoleModal
} from '../../redux/actionCreator/roleActions';
import { fetchCenters, updateUserCenter } from '../../redux/actionCreator/centersActions';
import './RoleDetails.scss';
import checkUserPermission from '../../helper/permissions';

export class RoleDetails extends Component {
  state = {
    headTitle: 'Add User',
    userDetail: ''
  }

  componentDidMount() {
    const {
      fetchRoleUsers, match: { params }, hideDeleteRoleModal,
      deleteModalState
    } = this.props;

    deleteModalState === 'visible' && hideDeleteRoleModal();
    fetchRoleUsers(params.roleId);
  }

  handleDeleteUserRole = (userId) => {
    const travelTeamMembersRoleId = 339458;
    const { deleteUserRole } = this.props;
    deleteUserRole(userId, travelTeamMembersRoleId);
  }

  handleAddUser = () => {
    const { openModal, hideDeleteRoleModal, deleteModalState } = this.props;
    this.setState({ headTitle: 'Add User', userDetail: '' });
    deleteModalState === 'visible' && hideDeleteRoleModal();
    openModal(true, 'new model');
  }

  handleEditCenter = (user) => {
    let { openModal, hideDeleteRoleModal, deleteModalState } = this.props;
    deleteModalState === 'visible' && hideDeleteRoleModal();
    openModal(true, 'new model');
    this.setState({
      headTitle: 'Change Center',
      userDetail: user
    });
  }

  renderUserRolePanelHeader() {
    const { roleName, hideDeleteRoleModal } = this.props;
    return (
      <div className="rp-role__header">
        <div className="role-panel-header">
          { roleName && (
            <PageHeader
              title={`${roleName}s`}
              actionBtn="Add User"
              hideDeleteRoleModal={hideDeleteRoleModal}
              openModal={this.handleAddUser}
            />
          ) }
        </div>
      </div>
    );
  }

  renderRoles() {
    const {
      error, roleName,
      isFetching, travelTeamMembers,
      deleteModalState, deleteModalRoleId,
      hideDeleteRoleModal, showDeleteRoleModal
    } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRoleDetailsTable
          isLoading={isFetching}
          travelTeamMembers={travelTeamMembers}
          error={error}
          roleName={roleName}
          handleEditCenter={this.handleEditCenter}
          handleDeleteUserRole={this.handleDeleteUserRole}
          deleteModalState={deleteModalState}
          deleteModalRoleId={deleteModalRoleId}
          hideDeleteRoleModal={hideDeleteRoleModal}
          showDeleteRoleModal={showDeleteRoleModal}
        />
      </div>
    );
  }

  renderRoleForm() {
    const { error, closeModal, shouldOpen, modalType,
      roleName, fetchRoleUsers, fetchCenters, centers, putRoleData, updateUserCenter, match } = this.props;
    const { headTitle, userDetail } = this.state;
    const { params: {roleId } } = match;
    return (
      <Modal
        closeModal={closeModal}
        width="480px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title={headTitle}
      >
        <NewUserRoleForm
          role={roleName}
          errors={error}
          closeModal={closeModal}
          getRoleData={() => fetchRoleUsers(roleId)}
          handleUpdateRole={putRoleData}
          fetchCenters={fetchCenters}
          updateUserCenter={updateUserCenter}
          centers={centers}
          userDetail={userDetail}
          myTitle={headTitle}
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
    let allowed = ['Travel Administrator', 'Super Administrator'];
    isLoaded ?
      checkUserPermission(history, allowed, getCurrentUserRole ) : null;

    return (
      <Fragment>
        {this.renderRoleForm()}
        {this.renderUserRolePage()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, role, user, centers }) => ({
  ...user,
  ...modal.modal,
  ...role,
  ...centers
});

RoleDetails.propTypes = {
  travelTeamMembers: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  getCurrentUserRole: PropTypes.array.isRequired,
  history: PropTypes.shape({}).isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  match: PropTypes.object.isRequired,
  roleName: PropTypes.string,
  fetchCenters: PropTypes.func.isRequired,
  centers: PropTypes.array,
  putRoleData: PropTypes.func.isRequired,
  updateUserCenter: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
  deleteModalRoleId: PropTypes.number.isRequired,
  deleteModalState: PropTypes.string.isRequired,
  showDeleteRoleModal: PropTypes.func.isRequired,
  hideDeleteRoleModal: PropTypes.func.isRequired,
  deleteUserRole: PropTypes.func.isRequired
};

RoleDetails.defaultProps = {
  isFetching: false,
  error: '',
  modalType: '',
  roleName: '',
  centers: [],
  isLoaded: false
};

const actionCreators = {
  fetchRoleUsers,
  putRoleData,
  openModal,
  closeModal,
  fetchCenters,
  updateUserCenter,
  deleteUserRole,
  hideDeleteRoleModal,
  showDeleteRoleModal
};

export default connect(
  mapStateToProps,
  actionCreators
)(RoleDetails);
