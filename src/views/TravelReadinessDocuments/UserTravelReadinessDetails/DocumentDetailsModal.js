import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from '../../../components/RequestsModal/UserInfo/UserInfo';
import AddComment from '../../../components/RequestsModal/CommentBox/AddComment';
import ConnectedCommentBox from '../../../components/RequestsModal/CommentBox/CommentBox';
import { fetchTravelReadinessDocument } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import Preloader from '../../../components/Preloader/Preloader';
import NotFound from '../../ErrorPages';
import ConnectedDocumentDetailsAttachment from './DocumentDetailsAttachment';

export const TravelDocumentField = ({ label, value }) => (
  <div>
    <div className="modal__travel-doc-item">
      <div className="modal__travel-doc-label">
        {label}
      </div>
      <div className="modal__travel-doc-text">
        {value}
      </div>
    </div>
  </div>
);

export class DocumentDetailsModal extends Component {
  state = {  }

  static propTypes = {
    document: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    documentId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    documentType: PropTypes.string.isRequired,
    fetchDocumentDetails: PropTypes.func.isRequired,
    fetchingDocument: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  }

  componentDidMount() {
    const { documentId, fetchDocumentDetails } = this.props;
    fetchDocumentDetails(documentId);
  }

  renderPassportDetails(document) {
    return (
      <Fragment>
        <TravelDocumentField label="Passport Number" value={document.data.passportNumber} />
        <TravelDocumentField label="Nationality" value={document.data.nationality} />
        <TravelDocumentField label="Date of Birth" value={document.data.dateOfBirth} />
        <TravelDocumentField label="Place of Issue" value={document.data.placeOfIssue} />
        <TravelDocumentField label="Date of Issue" value={document.data.dateOfIssue} />
        <TravelDocumentField label="Expiry Date" value={document.data.expiryDate} />
      </Fragment>
    );
  }

  renderVisaDetails(document) {
    return (
      <Fragment>
        <TravelDocumentField label="Country" value={document.data.country} />
        <TravelDocumentField label="Entry Type" value={document.data.entryType} />
        <TravelDocumentField label="Visa Type" value={document.data.visaType} />
        <TravelDocumentField label="Date of Issue" value={document.data.dateOfIssue} />
        <TravelDocumentField label="Expiry Date" value={document.data.expiryDate} />
      </Fragment>
    );
  }

  render() {
    const { documentType, document, userData, user: { picture }, fetchingDocument, error } = this.props;
    const userInfo = {
      ...userData,
      name: userData.fullName,
      role: userData.occupation,
    };

    if(!fetchingDocument && !document.data ) {
      return <NotFound redirectLink="/travel-readiness" errorMessage={error} />;
    }

    return (
      <Fragment>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
          <UserInfo requestData={userInfo} />
        </div>
        <div className="modal__travel-doc-details">
          {
            fetchingDocument && <Preloader />
          }
          {
            !fetchingDocument && documentType === 'passport'
              ? document.data && this.renderPassportDetails(document)
              : document.data && this.renderVisaDetails(document)
          }
        </div>
        {
          fetchingDocument ? <Preloader /> : <ConnectedDocumentDetailsAttachment documentData={document} />
        }
        <AddComment image={picture} />
        <ConnectedCommentBox />
      </Fragment>
    );
  }
}

TravelDocumentField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

TravelDocumentField.defaultProps = {
  value: 'n/a',
};

const mapStateToProps = ({ auth, travelReadinessDocuments }) => ({
  user: auth.user.UserInfo,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
  error: travelReadinessDocuments.error
});

const mapDispatchToProps = {
  fetchDocumentDetails: fetchTravelReadinessDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsModal);
