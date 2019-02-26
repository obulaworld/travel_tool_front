import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import PageHeader from '../../components/PageHeader';
import CreateTravelReasonModal from '../../components/TravelReasonsModal/TravelReasonsModal';
import {createTravelReason, editTravelReason,
  viewTravelDetails, fetchTravelReason
} from '../../redux/actionCreator/travelReasonsActions';
import ListTravelReasons from '../../components/TravelReasons/ListTravelReasons';
import { fetchAllTravelReasons } from '../../redux/actionCreator/listTravelReasonsActions';

export class TravelReasons extends Component {
  renderCreateTravelReasonModal = () => {
    const { openModal } = this.props;
    openModal(true, 'create travel reasons');
  };

  renderDisplayTravelReasonDetails = (id) => {
    const { openModal, viewTravelDetails } = this.props;
    viewTravelDetails(id);
    openModal(true, `view travel reason details-${id}`);
  };

  createNewTravelReason = (body) => {
    const { createTravelReason, history } = this.props;
    return createTravelReason(body, history);
  };

  renderEditTravelReasonModal = (id) => {
    const { openModal, fetchTravelReason} = this.props;
    fetchTravelReason(id);
    openModal(true, 'edit travel reasons');
  };

  render() {
    const {
      fetchAllTravelReasonsAction, location, closeModal, shouldOpen,
      modalType, editTravelReason, travelReason, travelReason: { isLoading }
    } = this.props;

    return (
      <Fragment>
        <div className="reasons-header">
          <PageHeader
            title="TRAVEL REASONS"
            actionBtn={isLoading ? '' : 'ADD REASON'}
            actionBtnClickHandler={this.renderCreateTravelReasonModal}
          />
        </div>
        <CreateTravelReasonModal
          travelReason={travelReason}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          editTravelReason={editTravelReason}
          createNewTravelReason={this.createNewTravelReason}
        />
        <ListTravelReasons
          editTravelReason={this.renderEditTravelReasonModal}
          listTravelReasons={travelReason}
          fetchAllTravelReasonsAction={fetchAllTravelReasonsAction}
          location={location}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          renderDisplayTravelReasonDetails={this.renderDisplayTravelReasonDetails}
        />
      </Fragment>
    );
  }
}

TravelReasons.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  viewTravelDetails: PropTypes.func,
  createTravelReason: PropTypes.func,
  editTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
  fetchAllTravelReasonsAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  fetchTravelReason: PropTypes.func.isRequired,
};

TravelReasons.defaultProps = {
  openModal: null,
  closeModal: null,
  createTravelReason: null,
  editTravelReason: null,
  viewTravelDetails: null,
  travelReason: {},
  shouldOpen: false,
  modalType: '',
  history: {
    push: () => {}
  }
};

export const mapStateToProps = ({ modal, travelReason }) => ({
  ...modal.modal,
  travelReason,
});

const actionCreators = {
  openModal,
  closeModal,
  createTravelReason,
  fetchAllTravelReasonsAction: fetchAllTravelReasons,
  editTravelReason,
  fetchTravelReason,
  viewTravelDetails,
};

export default connect(mapStateToProps, actionCreators)(TravelReasons);
