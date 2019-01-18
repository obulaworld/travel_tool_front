import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import editIcon from '../../images/edit.svg';
import checkListIcon from '../../images/checklisticon.svg';
import cancelIcon from '../../images/cancel.svg';
import deleteIcon from '../../images/deleted.svg';
import DeleteModal from '../../views/Documents/DeleteModal';

class TableMenu extends PureComponent {

  showDeleteModal = () => {
    let { openModal } = this.props;
    openModal(true, 'delete document');
  }

  confirmDeleteRequest = (e) => {
    e.preventDefault();
    const { deleteRequest, request, closeModal } = this.props;
    const requestId = request.id;
    deleteRequest(requestId);
    closeModal(true, 'new model');
  }

  handleIconOpentoggle = (toggleMenu, data, toggleId) => {
    return (
      <i
        className="fa fa-ellipsis-v"
        id={toggleId}
        role="presentation"
        onClick={() => toggleMenu(data.id, data)}
      />
    );
  };

  handleIconClosetoggle = (toggleMenu, data, toggleId) => {
    return (
      <li
        className="table__menu-list-item"
        id={toggleId}
        onClick={() => toggleMenu(data.id, data)}
        role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderTravelCheckListBtn = () => {
    const { showTravelChecklist, request, toggleMenu } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="travelChecklistBtn"
        onClick={() => {
          showTravelChecklist(request, 'travel checklist');
          toggleMenu(request.id, request);
        }}
        role="presentation"
      >
        <img src={checkListIcon} alt="cancel-icon" className="menu-icon" />
        Travel Checklist
      </li>
    );
  }

  renderCheckListSubmissionBtn = () => {
    const {
      requestStatus, showTravelChecklist,
      request, toggleMenu
    } = this.props;
    return (
      requestStatus === 'Approved' && (
        <li
          className="table__menu-list-item"
          id="checklistSubmission"
          onClick={() => {
            showTravelChecklist(request, 'upload submissions');
            toggleMenu(request.id, request);
          }}
          role="presentation"
        >
          <img src={checkListIcon} alt="list-icon" className="menu-icon" />
          Travel Checklist
        </li>
      )
    );
  }

  renderDelete = () => {
    const { shouldOpen, closeModal, modalType, request } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="deleteRequest"
        onClick={this.showDeleteModal}
        role="presentation"
      >
        <img src={deleteIcon} alt="delete-icon" className="menu-icon" />
        Delete
        <DeleteModal
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          handleDelete={this.confirmDeleteRequest}
          documentName={request.id}
          title="Delete Request"
        />
      </li>
    );
  }

  openToggleMenu(data) {
    const { menuOpen } = this.props;
    const openMenu = menuOpen.id === data.id && menuOpen.open;
    return openMenu;
  }

  renderToggle = () => {
    const {
      toggleMenu,
      editRequest,
      request,
      type,
      requestStatus } = this.props;

    return (
      <div>
        {this.handleIconOpentoggle(toggleMenu, request, 'toggleIcon')}
        <div className={`table__menu-container ${this.openToggleMenu(request) ? 'open' : ''}`}>
          {type === 'requests' && (
            <ul className="table__menu-list">
              {requestStatus === 'Open' && (
                <li
                  className="table__menu-list-item"
                  id="iconBtn"
                  onClick={() => {
                    editRequest(request.id);
                    toggleMenu(request.id);
                  }}
                  role="presentation"
                >
                  <img src={editIcon} alt="edit-icon" className="menu-icon" />
                  Edit
                </li>)}
              {type === 'requests' &&
                requestStatus === 'Open' && this.renderTravelCheckListBtn()
              }
              {this.renderCheckListSubmissionBtn()}
              {requestStatus === 'Open' && this.renderDelete()}
              {this.handleIconClosetoggle(toggleMenu, request, 'toggleButton')}
            </ul>
          )}
        </div>
      </div>
    );
  };

  renderEditButton = (data) => {
    const { toggleMenu, editDocument } = this.props;
    return (
      <Fragment>
        { this.handleIconOpentoggle(toggleMenu, data, 'toggleIcon2') }
        <div className={`table__menu-container ${
          this.openToggleMenu(data) ? 'open' : ''}`
        }>
          <ul className="table__menu-list">  
            {!data.isVerified && (
              <li
                className="table__menu-list-item"
                id="iconBtn2"
                onClick={() => {
                  toggleMenu(data.id);
                  editDocument(data.id);
                }}
                role="presentation"
              >
                <img src={editIcon} alt="edit-icon" className="menu-icon" />
                Edit
              </li>)}
            {this.handleIconClosetoggle(toggleMenu, data, 'toggleButton2')}
          </ul>
        </div>
      </Fragment>
    );
  }

  renderDocumentsToggle() {
    const { passportData, visaData, documentData } = this.props;
    return (
      <div>      
        { !isEmpty(passportData) && this.renderEditButton(passportData) }
        { !isEmpty(visaData) && this.renderEditButton(visaData) }
        { !isEmpty(documentData) && this.renderEditButton(documentData) }
      </div>
    );
  }

  render() {
    const { request, passportData, visaData, documentData } = this.props;
    return (
      <div className="menu__container">
        {!isEmpty(request) && this.renderToggle()}
        {!isEmpty(passportData) && this.renderDocumentsToggle()}
        {!isEmpty(visaData) && this.renderDocumentsToggle()}
        {!isEmpty(documentData) && this.renderDocumentsToggle()}
      </div>
    );
  }
}
TableMenu.defaultProps = {
  modalType: ''
};

TableMenu.propTypes = {
  editRequest: PropTypes.func,
  showTravelChecklist: PropTypes.func,
  request: PropTypes.object,
  requestStatus: PropTypes.string,
  type: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  passportData: PropTypes.object,
  visaData: PropTypes.object,
  documentData: PropTypes.object,
  editDocument: PropTypes.func,
};
TableMenu.defaultProps = {
  modalType: '',
  passportData: {},
  visaData: {},
  documentData: {},
  editDocument: () => {},
  editRequest: () => {},
  showTravelChecklist: () => {},
  request: {},
  requestStatus: '',
  type: '',
  deleteRequest: () => {},
  shouldOpen: false,
  openModal: () => {},
  closeModal: () => {},
};
TableMenu.defaultProps = {
  modalType: ''
};

export default TableMenu;
