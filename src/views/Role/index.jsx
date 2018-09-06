import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WithLoadingRoleTable from '../../components/RoleTable';
import Base from '../Base';
import RolePanelHeader from '../../components/RolePanelHeader';
import Modal from '../../components/modal/Modal';
import { NewUserRoleForm } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  getRoleData,
  putRoleData
} from '../../redux/actionCreator/roleActions';
import './Role.scss';

export class Role extends Base {
  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    selectedLink: 'settings page',
    hideOverlay: false
  };

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

  renderUserRolePage( ) {
    const { hideSideBar, selectedLink, hideNotificationPane } = this.state;
    let [hideClass, leftPaddingClass] = hideNotificationPane ? ['hide', ''] : ['', 'pd-left'];
    return (
      <div className="mdl-layout__content full-height">
        <div className="mdl-grid mdl-grid--no-spacing full-height">
          {this.renderLeftSideBar( hideSideBar, selectedLink)}
          <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            <div className={`rp-requests ${leftPaddingClass}`}>
              {this.renderUserRolePanelHeader()}
              {this.renderRoles()}
            </div>
          </div>
          {this.renderNotificationPane(hideClass, hideSideBar)}
        </div>
      </div>
    );
  }

  renderRolesTable  ()  {
    const { selectedLink, openSearch, hideOverlay } = this.state;
    const overlayClass = hideOverlay ? 'block' : 'none';
    return (
      <div>
        {this.renderOverlay(overlayClass)}
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
          {this.renderSideDrawer(selectedLink, overlayClass)}
          {this.renderNavBar(openSearch)}
          {this.renderRoleForm()}
          {this.renderUserRolePage( )}
        </div>
      </div>
    );
  }

  render() {
    const { getCurrentUserRole, history } = this.props;
    const isAdmin = getCurrentUserRole && getCurrentUserRole;
    if (isAdmin && isAdmin != 'Super Administrator') {
      history.push('/');
    }
    return (
      <div>
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
          <div>
            {this.renderRolesTable()}
          </div>
        </div>
      </div>
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
