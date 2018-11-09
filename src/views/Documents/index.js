import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchDocuments } from '../../redux/actionCreator/documentActions';
import DocumentsHeader from '../../components/DocumentsHeader';
import DocumentTable from './DocumentTable';
import Preloader from '../../components/Preloader/Preloader';
import './Documents.scss';

export class Documents extends Component {
  componentDidMount() {
    const { fetchDocuments } = this.props;
    fetchDocuments();
  }

  openAddModal = () => {
    let { openModal } = this.props;
    openModal(true, 'add document');
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

  renderDocumentsPage() {
    const { isLoading, documents } = this.props;
    const currentDocuments = (documents.length !== 0) ?
      <DocumentTable documents={documents} /> :
      this.renderNoDocumentMessage();

    return (
      <Fragment>
        {this.renderDocumentsHeader()}
        <div className="document__table">
          {isLoading ? <Preloader /> : currentDocuments }
        </div>
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
  isLoading: documents.isLoading,

});

const matchDispatchToProps = {
  openModal,
  fetchDocuments,
};

Documents.propTypes = {
  openModal: PropTypes.func.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,

};

export default connect(mapStateToProps, matchDispatchToProps)(Documents);
