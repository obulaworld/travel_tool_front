import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import PageHeader from '../../components/PageHeader';
import CreateTravelReasonModal from '../../components/TravelReasonsModal/TravelReasonsModal';
import { createTravelReason } from '../../redux/actionCreator/travelReasonsActions';
import ListTravelReasons from '../../components/TravelReasons/ListTravelReasons';
import { fetchAllTravelReasons } from '../../redux/actionCreator/listTravelReasonsActions';

export class TravelReasons extends Component {
  renderCreateTravelReasonModal = () => {
    const { openModal } = this.props;
    openModal(true, 'create travel reasons');
  };

  createNewTravelReason = (body) => {
    const { createTravelReason, history } = this.props;
    return createTravelReason(body, history);
  }

  render() {
    const {
      fetchAllTravelReasonsAction,
      location,
      closeModal,
      shouldOpen,
      modalType,
      travelReason
    } = this.props;
    return (
      <Fragment>
        <div className="reasons-header">
          <PageHeader
            title="MANAGE TRAVEL REASONS"
            actionBtn="Add Reason"
            actionBtnClickHandler={this.renderCreateTravelReasonModal}
          />
        </div>
        <CreateTravelReasonModal
          travelReason={travelReason}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          createNewTravelReason={this.createNewTravelReason}
        />
        <ListTravelReasons
          listTravelReasons={travelReason}
          fetchAllTravelReasonsAction={fetchAllTravelReasonsAction}
          location={location}
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
  createTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
  fetchAllTravelReasonsAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
};

TravelReasons.defaultProps = {
  openModal: null,
  closeModal: null,
  modalType: '',
  createTravelReason: null,
  travelReason: {},
  shouldOpen: false,
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
  fetchAllTravelReasonsAction: fetchAllTravelReasons
};

export default connect(mapStateToProps, actionCreators)(TravelReasons);
