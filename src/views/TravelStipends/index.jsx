import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {fetchCenters} from '../../redux/actionCreator/centersActions';
import {
  createTravelStipend,
  fetchAllTravelStipends,
  deleteTravelStipend,
  fetchSingleTravelStipend,
} from '../../redux/actionCreator/travelStipendsActions';
import { NewTravelStipendForm }  from '../../components/Forms';
import PageHeader from '../../components/PageHeader';
import ListTravelStipends from '../../components/TravelStipends/TravelStipends';


export class TravelStipends extends Component {

  componentDidMount() {
    const { fetchCenters } = this.props;
    fetchCenters();
  }
  renderCreateTravelStipendModal = () => {
    const { openModal } = this.props;
    openModal(true, 'create travel stipend');
  };


  renderNewTravelStipendForm() {
    const {
      closeModal, shouldOpen, modalType, centers, createTravelStipend,
      travelStipends,
      history,
    } = this.props;
    return (
      <Modal
        customModalStyles="modal--add-user" width="480px"
        visibility={shouldOpen && (modalType === 'create travel stipend')
          ? 'visible' : 'invisible'}
        title="Add Travel Stipend"
        closeModal={closeModal}
      >
        <NewTravelStipendForm
          history={history}
          closeModal={closeModal}
          handleCreateTravelStipend={createTravelStipend}
          centers={centers && centers.centers}
          travelStipends={travelStipends}
        />
      </Modal>
    );
  }

  render() {
    const {fetchAllTravelStipends, travelStipends,
      fetchSingleTravelStipend, deleteTravelStipend, shouldOpen,modalType , openModal, closeModal} = this.props;
    return (
      <Fragment>
        <div className="travelStipends--header">
          <PageHeader
            title="TRAVEL STIPEND"
            actionBtn="Add Stipend"
            actionBtnClickHandler={this.renderCreateTravelStipendModal}
          />
        </div>
        {this.renderNewTravelStipendForm()}
        <ListTravelStipends
          history={history}
          listAllTravelStipends={travelStipends}
          fetchAllTravelStipends={fetchAllTravelStipends}
          travelStipends={travelStipends}
          deleteTravelStipend={deleteTravelStipend}
          fetchSingleTravelStipend={fetchSingleTravelStipend}
          openModal={openModal}
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
        />
      </Fragment>
    );
  }
}

TravelStipends.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  centers: PropTypes.object.isRequired,
  fetchCenters: PropTypes.func.isRequired,
  deleteTravelStipend: PropTypes.func.isRequired,
  fetchSingleTravelStipend: PropTypes.func.isRequired,
  createTravelStipend: PropTypes.func,
  travelStipends: PropTypes.object,
  fetchAllTravelStipends: PropTypes.func.isRequired,
  history: PropTypes.object
};

TravelStipends.defaultProps = {
  openModal: null,
  closeModal: null,
  modalType: '',
  travelStipends: {},
  createTravelStipend: () => {},
  history: {
    push : () => {}
  }
};

export const mapStateToProps = ({ modal, centers, travelStipends }) => ({
  ...modal.modal,
  centers,
  travelStipends
});

const actionCreators = {
  openModal,
  closeModal,
  fetchCenters,
  createTravelStipend,
  fetchAllTravelStipends,
  deleteTravelStipend,
  fetchSingleTravelStipend
};

export default connect(mapStateToProps, actionCreators)(TravelStipends);
