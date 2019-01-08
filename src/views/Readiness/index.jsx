import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';
import ReadinessPanelHeader from '../../components/ReadinessPanelHeader/ReadinessPanelHeader';
import AddVisaForm from '../../components/Forms/TravelReadinessForm/AddVisaForm';
import {closeModal, openModal} from '../../redux/actionCreator/modalActions';
import Modal from '../../components/modal/Modal';
import {createTravelReadinessDocument} from '../../redux/actionCreator/travelReadinessActions';

export class TravelReadinessDocuments extends Component {

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

  renderVisaPage = () => {
    const { openModal } = this.props;
    return (
      <ReadinessPanelHeader openModal={openModal} />
    );
  };


  render() {
    return (
      <Fragment>
        {this.renderVisaPage()}
        {this.renderVisaModal()}
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
