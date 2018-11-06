import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import ChecklistPanelHeader from '../../components/ChecklistPanelHeader';
import { NewChecklistForm, } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { createTravelChecklist, fetchTravelChecklist, updateTravelChecklist, deleteTravelChecklist,
  fetchDeletedChecklistItems
} from '../../redux/actionCreator/travelChecklistActions';
import './index.scss';
import error from '../../images/error.svg';
import RestoreChecklistItem from '../../components/modal/RestoreChecklistModal/RestoreChecklistModal';
import DeleteRequestForm from '../../components/Forms/DeleteRequestForm/DeleteRequestForm';


export class Checklist extends Component {
  state = {
    itemToEdit: null,
    deleteReason: '',
    checklistItemId: '',
    restoreItemData: {},
    checklistItemName: ''
  }
  componentDidMount() {
    const { fetchTravelChecklist, fetchDeletedChecklistItems } = this.props;
    fetchTravelChecklist(null, localStorage.getItem('location'));
    fetchDeletedChecklistItems(localStorage.getItem('location'));
  }
  setItemToDelete = (checklistItemId) => () => {
    const { openModal } = this.props;
    this.setState({ checklistItemId });
    openModal(true, 'delete checklist item');
  }
  setItemToRestore = (checklistItemId) => () => {
    const { openModal, deletedChecklistItems } = this.props;
    const restoreItemData = deletedChecklistItems.find(item => item.id === checklistItemId);
    this.setState({ restoreItemData, checklistItemName: restoreItemData.name, checklistItemId });
    openModal(true, 'restore checklist item');
  }
  manageModal = (action, checklistItem = null) => () => {
    let { openModal, closeModal } = this.props;
    if (action === 'add') { openModal(true, 'add cheklistItem'); }
    if (action === 'edit'){ this.setState(() => ({itemToEdit: checklistItem})); openModal(true, 'edit cheklistItem'); }
    if (action === 'close-edit-modal') { closeModal(true, 'edit cheklistItem'); }
    if (action === 'close-delete-modal'){ closeModal(); this.setState({ deleteReason: null });}
  }

  handleInputChange = (event) => {
    this.setState({ deleteReason: event.target.value });
  }
  deleteChecklistItem = (event) => {
    event.preventDefault();
    const { deleteTravelChecklist } = this.props;
    const { checklistItemId } = this.state;
    deleteTravelChecklist(checklistItemId, this.state);
    this.setState({ deleteReason: null });
  }
  restoreChecklistItem = () => {
    const { updateTravelChecklist, checklistItems } = this.props;
    const { checklistItemId, restoreItemData } = this.state;
    updateTravelChecklist(checklistItemId, restoreItemData);
    this.setState({ deleteReason: null });
  }
  renderChecklistPanelHeader() {
    const { currentUser } = this.props;
    return (
      <div className="rp-role__header">
        <ChecklistPanelHeader openModal={this.manageModal('add')} location={currentUser.location} />
      </div>
    );
  }
  renderChecklistForm() {
    const { closeModal, shouldOpen, modalType, createTravelChecklist, updateTravelChecklist, currentUser, fetchTravelChecklist } = this.props;
    const { itemToEdit } = this.state;
    return (
      <Modal
        customModalStyles="add-checklist-item" closeModal={closeModal} width="480px"
        visibility={
          shouldOpen && (modalType === 'edit cheklistItem' || modalType === 'add cheklistItem') ? 'visible' : 'invisible'
        }
        title={`${modalType === 'edit cheklistItem' ? 'Edit' : 'Add'} Travel Checklist Item`}
      >
        <NewChecklistForm
          closeModal={closeModal}
          createTravelChecklist={createTravelChecklist} fetchTravelChecklist={fetchTravelChecklist}
          modalType={modalType} closeEditModal={this.manageModal('close-edit-modal')}
          updateTravelChecklist={updateTravelChecklist} checklistItem={itemToEdit} currentUser={currentUser}
        />
      </Modal>
    );
  }
  renderDeleteChecklistForm() {
    const { shouldOpen, modalType } = this.props;
    return (
      <DeleteRequestForm
        shouldOpen={shouldOpen}
        modalType={modalType}
        closeModal={this.manageModal('close-delete-modal')}
        handleInputChange={this.handleInputChange}
        deleteChecklistItem={this.deleteChecklistItem} />
    );
  }
  renderDeletedChecklistItem(deletedChecklistItem) {
    return (
      <div className="checklist-item">
        <div id="deleted-item">{deletedChecklistItem.name}</div>
        <div id="deleted-item">{deletedChecklistItem.deleteReason}</div>
        <button type="button" id="restore-btn" onClick={this.setItemToRestore(deletedChecklistItem.id)}>Restore</button>
      </div>
    );
  }
  renderRestoreChecklistForm() {
    const { shouldOpen, modalType } = this.props;
    const { checklistItemName } = this.state;
    return (     
      <RestoreChecklistItem 
        closeModal={this.manageModal('close-edit-modal')}
        shouldOpen={shouldOpen}
        modalType={modalType}
        itemName={checklistItemName}
        restoreChecklistItem={this.restoreChecklistItem} />
    );
  }
  renderDeletedChecklistItems() {
    const { deletedChecklistItems } = this.props;
    return (
      <div className="">
        { deletedChecklistItems.length !== 0 && deletedChecklistItems.map(deleteItem => {
          return ( <div key={deleteItem.id}>{this.renderDeletedChecklistItem(deleteItem)}</div> );
        }) }
      </div>
    );
  }
  renderChecklistPage() {
    const defaultChecklistItem = {
      name: 'Trip Ticket', resources: { label: '', link: '' }
    };
    const { isLoading, checklistItems, deletedChecklistItems } = this.props;
    const currentChecklistItems = (checklistItems.length !== 0) ? this.renderChecklistItems() : this.renderNoMessage();
    const deletedItems = (deletedChecklistItems.length !== 0 ) ? this.renderDeletedChecklistItems() : this.renderNoDeletedChecklistItems();
    return (
      <Fragment>
        {this.renderChecklistPanelHeader()}
        <div className="checklist-page">
          <div id="default-item-header">Default item</div>
          {this.renderChecklistItem(defaultChecklistItem)}
          <div id="added-item-header">Added Items</div>
          {isLoading ? <div id="loading">Loading...</div> : currentChecklistItems }
          <div id="deleted-item-header">Deleted Items</div>
          {isLoading ? <div id="loading">Loading...</div> : deletedItems }
        </div>
      </Fragment>
    );
  }
  renderChecklistItem(checklistItem) {
    return (
      <div className="checklist-item">
        <div id="item-name">{checklistItem.name}</div>
        {checklistItem.id && (
          <button type="button" id="edit-btn" onClick={this.manageModal('edit',checklistItem)}>Edit</button>
        )}
        {checklistItem.id && (
          <button type="button" id="delete-btn" onClick={this.setItemToDelete(checklistItem.id)}>Delete</button>
        )}
      </div>
    );
  }
  renderChecklistItems() {
    const { checklistItems } = this.props;
    return (
      <div className="">
        { checklistItems.length !== 0 && checklistItems[0].checklist.map(checklistItem => {
          return ( <div key={checklistItem.id}>{this.renderChecklistItem(checklistItem)}</div> );
        }) }
      </div>
    );
  }
  renderNoMessage() {
    const { checklistItems } = this.props;
    return (
      <div>
        <div className="checkInTable__trips--empty">
          { !checklistItems.length && 'No new checklist item added yet' }
        </div>
      </div>
    );
  }
  renderNoDeletedChecklistItems() {
    const { deletedChecklistItems } = this.props;
    return (
      <div className="checkInTable__trips--empty">
        { !deletedChecklistItems.length && 'There are currently no deleted travel checklist items for your location' }
      </div>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderChecklistForm()}
        {this.renderDeleteChecklistForm()}
        {this.renderChecklistPage()}
        {this.renderRestoreChecklistForm()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, travelChecklist, user }) => ({
  ...modal.modal,
  checklistItems: travelChecklist.checklistItems,
  currentUser: user.currentUser,
  isLoading: travelChecklist.isLoading,
  deletedChecklistItems: travelChecklist.deletedCheckListItems,
});

const mapDispatchToProps = {
  openModal,
  closeModal,
  createTravelChecklist,
  deleteTravelChecklist,
  fetchTravelChecklist,
  updateTravelChecklist,
  fetchDeletedChecklistItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);

Checklist.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createTravelChecklist: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  deleteTravelChecklist: PropTypes.func,
  updateTravelChecklist: PropTypes.func,
  fetchDeletedChecklistItems: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  checklistItems: PropTypes.array.isRequired,
  deletedChecklistItems: PropTypes.array,
  currentUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Checklist.defaultProps = {
  deleteTravelChecklist: () => {},
  updateTravelChecklist: () => {},
  deletedChecklistItems: [],
  modalType: ''
};
