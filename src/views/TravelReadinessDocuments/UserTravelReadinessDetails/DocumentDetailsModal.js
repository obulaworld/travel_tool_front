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
    getCurrentUserRole: PropTypes.array.isRequired
  };

  static defaultProps = {
    error: '',
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
    const { documentType, document, userData, user: { picture }, fetchingDocument, error } = this.props;
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

const mapStateToProps = ({ user, auth, travelReadinessDocuments }) => ({
  user: auth.user.UserInfo,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
  error: travelReadinessDocuments.error,
  getCurrentUserRole: user.getCurrentUserRole,
});

const mapDispatchToProps = {
  fetchDocumentDetails: fetchTravelReadinessDocument,
  verifyDocument: verifyTravelReadinessDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsModal);
