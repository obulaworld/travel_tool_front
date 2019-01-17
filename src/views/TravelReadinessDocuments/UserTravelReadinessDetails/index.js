import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../../components/PageHeader';
import '../TravelReadinessDocuments.scss';
import TravelReadinessDetailsTable from './UserTravelReadinessDetailsTable';
import Button from '../../../components/buttons/Buttons';
import { fetchUserReadinessDocuments } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import { openModal, closeModal } from '../../../redux/actionCreator/modalActions';

class UserTravelReadinessDetails extends Component {
  state = {
    activeDocument: 'passport',
    documentId: '',
  };

  componentDidMount() {
    const { fetchUserData, match: {params: {userId}} } = this.props;
    fetchUserData(userId);
  }

  toggleDocumentTab = (type) => {
    this.setState({
      activeDocument: type
    });
  }

  showDocumentDetail = (documentId) => {
    const { openModal } = this.props;
    this.setState({
      documentId
    });
    openModal(true, 'document details');
  }

  render() {
    const { activeDocument, documentId } = this.state;
    const { userReadiness, isLoading, shouldOpen, modalType, closeModal } = this.props;
    const { fullName, travelDocuments } = userReadiness;
    const { passport, visa } = travelDocuments;
    return (
      <Fragment>
        <div className={isLoading ? 'readiness-header' : ''}>
          {
            !isLoading && (
              <div className="request-panel-header">
                <PageHeader
                  addLink
                  title={fullName}
                  iconLink="/travel-readiness"
                />
                <div className="open-requests">
                  <div className="button-group">
                    <Button
                      showBadge
                      badge={passport && passport.length}
                      text="Passports"
                      onClick={() => this.toggleDocumentTab('passport')}
                      buttonClass={`bg-btn bg-btn--with-badge ${activeDocument === 'passport' ? 'bg-btn--active' : ''}`}
                      badgeClass={activeDocument === 'passport' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
                    />
                    <Button
                      showBadge
                      badge={visa && visa.length}
                      text="Visas"
                      onClick={() => this.toggleDocumentTab('visa')}
                      buttonClass={`bg-btn bg-btn--with-badge ${activeDocument === 'visa' ? 'bg-btn--active' : ''}`}
                      badgeClass={activeDocument === 'visa' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge__approvals--inactive'}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <TravelReadinessDetailsTable closeModal={closeModal} shouldOpen={shouldOpen} modalType={modalType} isLoading={isLoading} activeDocument={activeDocument} passports={passport} visas={visa} handleShowDocument={this.showDocumentDetail} documentId={documentId} userData={userReadiness} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({travelReadinessDocuments, modal}) => ({
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading,
  ...modal.modal,
});

const mapDispatchToProps = {
  fetchUserData: fetchUserReadinessDocuments,
  closeModal,
  openModal,
};

UserTravelReadinessDetails.propTypes = {
  fetchUserData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userReadiness: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

UserTravelReadinessDetails.defaultProps = {
  modalType: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTravelReadinessDetails);
