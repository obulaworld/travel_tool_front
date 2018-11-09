import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  fetchDocuments,
  editDocument,
  updateDocumentOnEdit,
  updateDocument,
  removeDocumentFromEdit,
  createDocument
} from '../../redux/actionCreator/documentActions';
import DocumentsHeader from '../../components/DocumentsHeader';
import NewDocumentForm from '../../components/Forms/NewDocumentForm';
import DocumentTable from './DocumentTable';
import Preloader from '../../components/Preloader/Preloader';
import './Documents.scss';

export class Documents extends Component {
  state = {
    menuOpen: { open: false, id: null }
  };

  componentDidMount() {
    const { fetchDocuments } = this.props;
    fetchDocuments();
  }

  openAddModal = () => {
    let{ openModal } = this.props;
    openModal(true, 'add document');
  }

  handleOpenModal = (modalType) => {
    let { openModal } = this.props;
    openModal(true, modalType);
    this.setState({ menuOpen: { open: false, id: null } });
  }

  handleCloseEditModal = () => {
    const { closeModal, removeDocumentFromEdit } = this.props;
    const { menuOpen } = this.state;
    menuOpen.open && this.setState({ menuOpen: { open: false, id: null } });
    closeModal();
    return removeDocumentFromEdit();
  }

  handleRenameDocument = () => {
    const { documentOnEdit, updateDocument } = this.props;
    updateDocument(documentOnEdit);
  }

  toggleMenu = (document) => {
    const { menuOpen } = this.state;
    const { id } = document;
    if (id && (menuOpen.id !== id)) return this
      .setState({ menuOpen: { open: true, id } });

    this.setState({ menuOpen: { open: false, id: null } });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const { documentOnEdit, updateDocumentOnEdit } = this.props;
    documentOnEdit && updateDocumentOnEdit(value);
  }

  renderDocumentRenameForm = () => {
    const { documentOnEdit } = this.props;
    return (
      <div className="doc-rename">
        <label htmlFor="doc-rename-input">
            Name
          <span className="asterick">*</span>
          <br />
          <input
            type="text"
            className="doc-rename-input"
            onChange={this.handleInputChange}
            value={documentOnEdit ? documentOnEdit.name : ''}
          />
        </label>
      </div>
    );
  }

  renderSubmitArea = () => {
    const { documentOnEdit } = this.props;
    return (
      <div className="submit-area">
        <p>
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            id="oncancel"
            onClick={this.handleCloseEditModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-btn bg-btn--inactive doc-btn-save"
            id="cancel"
            disabled={documentOnEdit && !documentOnEdit.name}
            onClick={this.handleRenameDocument}
          >
            Save
          </button>
        </p>
      </div>
    );
  }

  renderDocumentEditModal = () => {
    const { shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={this.handleCloseEditModal}
        width="480px"
        modalId="edit-document-modal"
        modalContentId="edit-document-modal-content"
        visibility={
          (shouldOpen && modalType === 'rename document')
            ? 'visible'
            : 'invisible'
        }
        title="Rename File"
      >
        {this.renderDocumentRenameForm()}
        {this.renderSubmitArea()}
      </Modal>
    );
  }

  renderDocumentsHeader() {
    return (
      <div>
        <DocumentsHeader openModal={this.openAddModal} />
      </div>
    );
  }

  renderNoDocumentMessage() {
    const { documents } = this.props;
    return (
      <div>
        <div className="checkInTable__trips--empty">
          { !documents.length && 'No uploaded documents at the moment' }
        </div>
      </div>
    );
  }

  renderDocumentsForm() {
    const { closeModal, shouldOpen, modalType, user, createDocument } = this.props;
    return (
      <Modal 
        customModalStyles="add-document-item" closeModal={closeModal} width="480px" height="375px"
        visibility={
          shouldOpen && (modalType === 'add document') ? 'visible' : 'invisible'
        }
        title="Add File"
      >
        <NewDocumentForm closeModal={closeModal} user={user} createDocument={createDocument} />
      </Modal>
    );
  }

  renderDocumentsPage() {
    const { isLoading, documents, editDocument } = this.props;
    const { menuOpen } = this.state;
    const currentDocuments = (documents.length) ? (
      <DocumentTable
        documents={documents}
        menuOpen={menuOpen}
        toggleMenu={this.toggleMenu}
        openModal={this.handleOpenModal}
        editDocument={editDocument}
      />
    ):
      this.renderNoDocumentMessage();

    return (
      <Fragment>
        {this.renderDocumentsForm()}
        {this.renderDocumentsHeader()}
        <div className="document__table">
          {isLoading ? <Preloader /> : currentDocuments }
        </div>
        {this.renderDocumentEditModal()}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderDocumentsPage()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, user, documents }) => ({
  ...modal.modal,
  user: user.getUserData,
  documents: documents.documents,
  documentOnEdit: documents.documentOnEdit,
  isLoading: documents.fetchingDocuments,
});

const matchDispatchToProps = {
  openModal,
  closeModal,
  createDocument,
  fetchDocuments,
  editDocument,
  updateDocumentOnEdit,
  updateDocument,
  removeDocumentFromEdit
};

Documents.propTypes = {
  user: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  editDocument: PropTypes.func.isRequired,
  documentOnEdit: PropTypes.object,
  updateDocumentOnEdit: PropTypes.func.isRequired,
  removeDocumentFromEdit: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


Documents.defaultProps ={
  modalType: null,
  user: {},
  documentOnEdit: null
};


export default connect(mapStateToProps, matchDispatchToProps)(Documents);
