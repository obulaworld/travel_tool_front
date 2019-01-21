import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from '../../../components/RequestsModal/UserInfo/UserInfo';
import AddComment from '../../../components/RequestsModal/CommentBox/AddComment';
import ConnectedCommentBox from '../../../components/RequestsModal/CommentBox/CommentBox';
// import FileAttachment from '../../Attachments';
import { fetchTravelReadinessDocument, verifyTravelReadinessDocument } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import Preloader from '../../../components/Preloader/Preloader';
import Button from '../../../components/buttons/Buttons';
import NotFound from '../../ErrorPages';
import ConnectedDocumentDetailsAttachment from './DocumentDetailsAttachment';
import './VerifyTravelReadinessDocument.scss';
import checkUserPermission from '../../../helper/permissions';
import ConnectedUserComments from '../../../components/RequestsModal/UserComments/UserComments';

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
    verifyDocument: PropTypes.func.isRequired,
    getCurrentUserRole: PropTypes.array.isRequired,
    email: PropTypes.object,
    currentUser: PropTypes.object,
  };

  static defaultProps = {
    error: '',
    email: {},
    currentUser: {},
  }

  componentDidMount() {
    const { documentId, fetchDocumentDetails } = this.props;
    fetchDocumentDetails(documentId);
  }

  verifyDocumentDetails = () => {
    const { documentId, verifyDocument } = this.props;
    verifyDocument(documentId);
  }

  checkCurrentUserStatus = () => {
    const { getCurrentUserRole } = this.props;
    const allowedRoles = ['Super Administrator', 'Travel Administrator'];
    const allowed = getCurrentUserRole.some(role => allowedRoles.includes(role));
    if (!allowed && allowedRoles.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  
  generateDocumentData(documentType, document) {
    const { data } = document;
    switch(documentType){
    case 'passport': 
      return [ 
        { key: 'Passport Number', value: data.passportNumber },
        { key: 'Nationality', value: data.nationality },
        { key: 'Date of Birth', value: data.dateOfBirth },
        { key: 'Place of Issue', value: data.placeOfIssue },
        { key: 'Date of Issue', value: data.dateOfIssue },
        { key: 'Expiry Date', value: data.expiryDate },
      ];
    case 'visa':
      return [
        { key: 'Country', value: data.country },
        { key: 'Entry Type', value: data.entryType },
        { key: 'Visa Type', value: data.visaType },
        { key: 'Date of Issue', value: data.dateOfIssue },
        { key: 'Expiry Date', value: data.expiryDate },
      ];
    case 'other': 
      return [
        { key: 'Document Name', value: data.name },
        { key: 'Document Id', value: data.documentId || 'N/A' },
        { key: 'Date of Issue', value: data.dateOfIssue },
        { key: 'Expiry Date', value: data.expiryDate },
      ];
    default:
      return;
    }
  }
  
  renderDocuments(documentData) {
    return (
      documentData
        .map(
          document => (
            <TravelDocumentField 
              key={document.key} 
              label={document.key} 
              value={document.value} 
            />
          ))
    );
  }

  renderVerificationButton = () => {
    const { document } = this.props;
    return (
      <span className="modal__button-below">
        <span className="modal__dialog-btn">
          <Button
            text={document.isVerified ? 'Verified' : 'Verify'}
            onClick={this.verifyDocumentDetails}
            buttonType="button"
            buttonClass={document.isVerified ? 'button__verified' : 'button__verify'}
            disabled={document.isVerified ? true : false}
          />
        </span>
      </span>
    );
  }

  renderRequesterVerificationStatus = () => {
    const { document } = this.props;
    return (
      <span className="modal__button-below">
        <span className="modal__dialog-btn">
          <span className={document.isVerified ? 'status__verified' : 'status__verify'}>
            {document.isVerified ? 'Verified' : 'Pending'}
          </span>
        </span>
      </span>
    );
  }

  render() {
    const { documentType, document, userData, user: { picture }, fetchingDocument, error, email, currentUser } = this.props;
    const userInfo = {
      ...userData,
      name: userData.fullName,
      role: userData.occupation,
    };

    if (!fetchingDocument && !document.data) {
      return <NotFound redirectLink="/travel-readiness" errorMessage={error} />;
    }

    return (
      <Fragment>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <UserInfo requestData={userInfo} />
          {this.checkCurrentUserStatus() ? this.renderVerificationButton() : this.renderRequesterVerificationStatus()}
        </div>
        <div className="modal__travel-doc-details">
          {
            fetchingDocument && <Preloader />
          }
          {
            !fetchingDocument && this.renderDocuments(this.generateDocumentData(documentType, document))
          }
        </div>
        {
          fetchingDocument ? <Preloader /> : <ConnectedDocumentDetailsAttachment documentData={document} />
        }
        <AddComment image={picture} />
        <ConnectedCommentBox requestId={null} documentId={document.id} />
        <div id="comments">
          <ConnectedUserComments comments={document.comments ? document.comments.slice(0).reverse(): []} email={email.result && email.result.email} currentUser={currentUser} />
        </div>
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

const mapStateToProps = ({ user, auth, travelReadinessDocuments }, state) => ({
  user: auth.user.UserInfo,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
  error: travelReadinessDocuments.error,
  getCurrentUserRole: user.getCurrentUserRole,
  currentUser: user.currentUser,
});

const mapDispatchToProps = {
  fetchDocumentDetails: fetchTravelReadinessDocument,
  verifyDocument: verifyTravelReadinessDocument,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsModal);
