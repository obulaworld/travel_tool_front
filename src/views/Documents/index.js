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
  removeDocumentFromEdit
} from '../../redux/actionCreator/documentActions';
import DocumentsHeader from '../../components/DocumentsHeader';
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
          shouldOpen && modalType.match('rename document')
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
        <DocumentsHeader openModal={this.handleOpenModal} />
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

export const mapStateToProps = ({ modal, documents  }) => ({
  ...modal.modal,
  documents: documents.documents,
  documentOnEdit: documents.documentOnEdit,
  isLoading: documents.fetchingDocuments,

});

const matchDispatchToProps = {
  openModal,
  closeModal,
  fetchDocuments,
  editDocument,
  updateDocumentOnEdit,
  updateDocument,
  removeDocumentFromEdit
};

const documentsPropTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  editDocument: PropTypes.func.isRequired,
  documentOnEdit: PropTypes.object,
  updateDocumentOnEdit: PropTypes.func.isRequired,
  removeDocumentFromEdit: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
};

const documentsDefaultProps = {
  modalType: null,
  documentOnEdit: null
};

Documents.propTypes = { ...documentsPropTypes };

Documents.defaultProps = { ...documentsDefaultProps };

export default connect(mapStateToProps, matchDispatchToProps)(Documents);
