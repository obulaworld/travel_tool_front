import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';
import AddVisaForm from '../../components/Forms/TravelReadinessForm/AddVisaForm';
import {closeModal, openModal} from '../../redux/actionCreator/modalActions';
import Modal from '../../components/modal/Modal';
import PassportForm from '../../components/Forms/TravelReadinessForm/PassportForm';
import {createTravelReadinessDocument} from '../../redux/actionCreator/travelReadinessActions';
import PageHeader from '../../components/PageHeader';
import './Readiness.scss';

export class TravelReadinessDocuments extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { documentContext: 'Passport' };
  }

  handleModals = (documentContext) => {
    const { openModal } = this.props;
    switch (documentContext) {
    case 'Passport':
      openModal(true, 'add Passport');
      break;
    case 'Visa':
      openModal(true, 'add visa');
      break;
    default:
      // Handle the opening of the 'others' modal
      return;
    }
  };

  renderVisaModal = () => {
    const {closeModal, shouldOpen, modalType, createTravelReadinessDocument, travelReadinessDocuments} = this.props;
    return (
      <Modal
        customModalStyles="add-document-item" closeModal={closeModal} width="580px" height="600px"
        visibility={
          shouldOpen && (modalType === 'add visa') ? 'visible' : 'invisible'
        }
        title="Add Visa"
      >
        <AddVisaForm closeModal={closeModal} createTravelReadinessDocument={createTravelReadinessDocument} {...travelReadinessDocuments} />
      </Modal>
    );
  };

  renderPassportModal = () => {
    const {closeModal, shouldOpen, modalType,
      travelReadinessDocuments,
      createTravelReadinessDocument } = this.props;
    return (
      <Modal
        customModalStyles="add-document-item" closeModal={closeModal} width="680px"
        visibility={
          shouldOpen && (modalType === 'add Passport') ? 'visible' : 'invisible'
        }
        title="Add Passport"
      >
        <PassportForm
          createTravelReadinessDocument={createTravelReadinessDocument}
          {...travelReadinessDocuments} />
      </Modal>
    );
  };

  handleContextChange = (documentContext) => {
    this.setState({ documentContext });
  }

  renderButton = (text, active, onClickHandler, moreProps) => {
    let className = 'documents-button-group__button';
    if(active){
      className += '--active';
    }else if (active === false){
      className += '--inactive';
    }
    return (
      <button
        type="button"
        className={className}
        onClick={onClickHandler}
        {...moreProps}
      >
        {text}
      </button>
    );
  }

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
            this.isActive('Passport'),
            () => this.handleContextChange('Passport'),
            {id: 'passportButton'}
          )}
          {this.renderButton(
            'Visas',
            this.isActive('Visa'),
            () => this.handleContextChange('Visa'),
            {id: 'visaButton'}
          )}
        </div>
        {this.renderButton(
          `Add${' ' + documentContext}`,
          undefined,
          () => this.handleModals(documentContext),
          {id: 'actionButton'}
        )}
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <PageHeader title="Travel Readiness" />
        {this.renderButtonGroup()}
        {this.renderVisaModal()}
        {this.renderPassportModal()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({modal, travelReadinessDocuments}) => ({
  ...modal.modal,
  travelReadinessDocuments
});

const matchDispatchToProps = {
  openModal,
  closeModal,
  createTravelReadinessDocument
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

export default connect(mapStateToProps, matchDispatchToProps)(TravelReadinessDocuments);
