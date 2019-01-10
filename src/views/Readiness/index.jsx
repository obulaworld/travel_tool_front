import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReadinessPanelHeader from '../../components/ReadinessPanelHeader/ReadinessPanelHeader';
import AddVisaForm from '../../components/Forms/TravelReadinessForm/AddVisaForm';
import { closeModal, openModal } from '../../redux/actionCreator/modalActions';
import Modal from '../../components/modal/Modal';
import Button from '../../components/buttons/Buttons';
import { createTravelReadinessDocument } from '../../redux/actionCreator/travelReadinessActions';
import { fetchUserReadinessDocuments } from '../../redux/actionCreator/travelReadinessDocumentsActions';
import TravelReadinessDetailsTable from '../TravelReadinessDocuments/UserTravelReadinessDetails/UserTravelReadinessDetailsTable';
import './Readiness.scss';

export class TravelReadinessDocuments extends Component {
  state = {
    activeDocument: 'passport',
    documentId: ''
  };

  componentDidMount() {
    const { fetchUserData, user } = this.props;
    fetchUserData(user.currentUser.userId);
  }

  toggleDocumentTab = type => {
    this.setState({
      activeDocument: type
    });
  };

  showDocumentDetail = documentId => {
    const { openModal } = this.props;
    this.setState({
      documentId
    });
    openModal(true, 'document details');
  };

  renderVisaModal = () => {
    const {
      closeModal,
      shouldOpen,
      modalType,
      createTravelReadinessDocument,
      travelReadinessDocuments
    } = this.props;
    return (
      <Modal
        customModalStyles="add-document-item"
        closeModal={closeModal}
        width="580px"
        height="600px"
        visibility={
          shouldOpen && modalType === 'add visa' ? 'visible' : 'invisible'
        }
        title="Add Visa"
      >
        <AddVisaForm
          closeModal={closeModal}
          createTravelReadinessDocument={createTravelReadinessDocument}
          {...travelReadinessDocuments}
        />
      </Modal>
    );
  };

  renderPanelHeader() {
    const { activeDocument } = this.state;
    const { userReadiness, isLoading } = this.props;
    const {
      travelDocuments: { passport, visa }
    } = userReadiness;
    return (
      <Fragment>
        {!isLoading && (
          <div className="space-header">
            <div className="open-requests">
              <div className="button-group">
                <Button
                  showBadge
                  badge={passport && passport.length}
                  onClick={() => this.toggleDocumentTab('passport')}
                  text="Passports"
                  buttonClass={`bg-btn bg-btn--with-badge ${
                    activeDocument === 'passport' ? 'bg-btn--active' : ''
                  }`}
                  badgeClass={
                    activeDocument === 'passport'
                      ? 'bg-btn--with-badge--active'
                      : 'bg-btn--with-badge__approvals--inactive'
                  }
                />
                <Button
                  badge={visa && visa.length}
                  showBadge
                  buttonClass={`bg-btn bg-btn--with-badge ${
                    activeDocument === 'visa' ? 'bg-btn--active' : ''
                  }`}
                  badgeClass={
                    activeDocument === 'visa'
                      ? 'bg-btn--with-badge--active'
                      : 'bg-btn--with-badge__approvals--inactive'
                  }
                  text="Visas"
                  onClick={() => this.toggleDocumentTab('visa')}
                />
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }

  renderVisaPage = () => {
    const { openModal } = this.props;
    return <ReadinessPanelHeader openModal={openModal} />;
  };

  render() {
    const { activeDocument, documentId } = this.state;
    const {
      userReadiness,
      isLoading,
      shouldOpen,
      modalType,
      closeModal
    } = this.props;
    const {
      travelDocuments: { passport, visa }
    } = userReadiness;
    return (
      <Fragment>
        <div style={{ width: '96%' }}>{this.renderVisaPage()}</div>
        {this.renderVisaModal()}
        <div className={isLoading ? 'readiness-header' : ''}>
          {this.renderPanelHeader()}
        </div>
        <TravelReadinessDetailsTable
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          isLoading={isLoading}
          activeDocument={activeDocument}
          passports={passport}
          visas={visa}
          handleShowDocument={this.showDocumentDetail}
          documentId={documentId}
          userData={userReadiness}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ modal, travelReadinessDocuments, user }) => ({
  ...modal.modal,
  travelReadinessDocuments,
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading,
  user: user
});

const matchDispatchToProps = {
  openModal,
  closeModal,
  createTravelReadinessDocument,
  fetchUserData: fetchUserReadinessDocuments
};

TravelReadinessDocuments.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired
};

TravelReadinessDocuments.defaultProps = {
  modalType: 'add visa'
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(TravelReadinessDocuments);
