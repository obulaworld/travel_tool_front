import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddVisaForm from '../../components/Forms/TravelReadinessForm/AddVisaForm';
import { closeModal, openModal } from '../../redux/actionCreator/modalActions';
import Modal from '../../components/modal/Modal';
import TravelDocumentModal from '../../components/modal/TravelDocumentModal/TravelDocumentModal';
import PassportForm from '../../components/Forms/TravelReadinessForm/PassportForm';
import { createTravelReadinessDocument } from '../../redux/actionCreator/travelReadinessActions';
import PageHeader from '../../components/PageHeader';
import {
  fetchUserReadinessDocuments
} from '../../redux/actionCreator/travelReadinessDocumentsActions';
import
TravelReadinessDetailsTable
  from '../TravelReadinessDocuments/UserTravelReadinessDetails/UserTravelReadinessDetailsTable';
import './Readiness.scss';
import ReadinessInteractiveModal from './ReadinessInteractiveModal';

export class TravelReadinessDocuments extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documentContext: 'passport',
      documentId: ''
    };
  }

  componentDidMount() {
    const { fetchUserData, user } = this.props;
    fetchUserData(user.currentUser.userId);
  }
  toggleDocumentTab = type => {
    this.setState({
      documentContext: type
    });
    switch (type) {
    case 'passport':
      openModal(true, 'add Passport');
      break;
    case 'visa':
      openModal(true, 'add visa');
      break;
    case 'other':
      openModal(true, 'add other');
      break;
    default:
      return;
    }
  };

  showDocumentDetail = documentId => {
    const { openModal } = this.props;
    this.setState({
      documentId
    });
    openModal(true, 'document details');
  };

  handleModals = documentContext => {
    const { openModal } = this.props;
    switch (documentContext) {
    case 'passport':
      openModal(true, 'add Passport');
      break;
    case 'visa':
      openModal(true, 'add visa');
      break;
    case 'other':
      openModal(true, 'add other');
      break;
    default:
      return;
    }
  };

  renderVisaModal = () => {
    const {
      closeModal, shouldOpen, modalType,
      createTravelReadinessDocument,
      travelReadinessDocuments,
      fetchUserData,
      user
    } = this.props;
    return (
      <Modal
        customModalStyles="add-document-item"
        closeModal={closeModal}
        width="580px" height="600px"
        visibility={
          shouldOpen && modalType === 'add visa' ? 'visible' : 'invisible'
        }
        title="Add Visa"
      >
        <AddVisaForm
          closeModal={closeModal}
          createTravelReadinessDocument={createTravelReadinessDocument}
          documentType="visa"
          travelReadinessDocuments={travelReadinessDocuments}
          fetchUserData={fetchUserData}
          user={user}
        />
      </Modal>
    );
  };

  renderOtherDocumentModal = () => {
    return <TravelDocumentModal {...this.props} />;
  };

  renderPassportModal = () => {
    const {
      closeModal, shouldOpen, modalType, travelReadinessDocuments,
      createTravelReadinessDocument, fetchUserData, user
    } = this.props;
    return (
      <Modal
        customModalStyles="add-document-item"
        closeModal={closeModal}
        width="680px"
        visibility={
          shouldOpen && modalType === 'add Passport' ? 'visible' : 'invisible'
        }
        title="Add Passport"
      >
        <PassportForm
          createTravelReadinessDocument={createTravelReadinessDocument}
          {...travelReadinessDocuments}
          fetchUserData={fetchUserData}
          closeModal={closeModal}
          user={user}
        />
      </Modal>
    );
  };

  renderButton = (text, active, onClickHandler, moreProps) => {
    let className = 'documents-button-group__button';
    return (
      <button
        type="button"
        className={`${className}${ active ? '--active' : '--inactive'}`}
        onClick={onClickHandler}
        {...moreProps}
      >
        {text}
      </button>
    );
  };

  isActive(buttonContext) {
    const { documentContext } = this.state;
    return buttonContext === documentContext;
  }

  renderButtonGroup() {
    const { documentContext } = this.state;
    return (
      <div className="documents-button-group">
        <div>
          {this.renderButton(
            'Passports',
            this.isActive('passport'),
            () => this.toggleDocumentTab('passport'),
            { id: 'passportButton' }
          )}
          {this.renderButton(
            'Visas',
            this.isActive('visa'),
            () => this.toggleDocumentTab('visa'),
            { id: 'visaButton' }
          )}
          {this.renderButton(
            'Others',
            this.isActive('other'),
            () => this.toggleDocumentTab('other'),
            { id: 'otherButton' }
          )}
        </div>
        {this.renderButton(
          `Add${' ' + documentContext}`,
          undefined,
          () => this.handleModals(documentContext),
          { id: 'actionButton' }
        )}
      </div>
    );
  }

  render() {
    const { documentId, documentContext } = this.state;
    const { userReadiness, isLoading, shouldOpen, modalType, closeModal } = this.props;
    const { travelDocuments: { passport, visa, other  } } = userReadiness;
    return (
      <Fragment>
        <PageHeader title="Travel Documents" />
        {this.renderButtonGroup()}
        {this.renderVisaModal()}
        {this.renderPassportModal()}
        {this.renderOtherDocumentModal()}
        <TravelReadinessDetailsTable
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          isLoading={isLoading}
          activeDocument={documentContext}
          passports={passport}
          visas={visa}
          others={other}
          handleShowDocument={this.showDocumentDetail}
          documentId={documentId}
          userData={userReadiness}
        />
        <ReadinessInteractiveModal
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          documentContext={documentContext}
          handleModals={this.handleModals}
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
