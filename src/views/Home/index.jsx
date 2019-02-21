import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './home.scss';
import { fetchTeammates } from '../../redux/actionCreator/homeActions';
import GetStarted from '../../components/GetStated';
import Teammates from '../../components/Teammates';
import HomeRequests from '../../components/HomeRequests';
import Modal from '../../components/modal/Modal';
import { NewRequestForm } from '../../components/Forms';

import {
  fetchAvailableRooms, fetchAvailableRoomsSuccess
} from '../../redux/actionCreator/availableRoomsActions';
import {
  fetchUserRequests, createNewRequest, editRequest,
} from '../../redux/actionCreator/requestActions';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';
import {fetchCenters} from '../../redux/actionCreator/centersActions';

export class Home extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      url: location.search,
      department: '',
      availableRooms:{}
    };
  }

  componentDidMount() {
    const { url } = this.state;
    const { fetchUserRequests, fetchRoleUsers, fetchCenters } = this.props;
    fetchUserRequests(url);
    fetchRoleUsers(53019);
    fetchCenters();
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { department, fetchTeammates, availableRooms, fetchAvailableRooms } = nextProps;

    if(department !== prevState.department) {
      fetchTeammates(department);
      return {department};
    }
    if(availableRooms === prevState.availableRooms){
      fetchAvailableRooms();
      return { availableRooms };
    }

    return null;
  }

  handleOpenModal = () => {
    const { openModal } = this.props;

    openModal(true, 'new request');
  };

  renderNewRequestForm() {
    const {
      updateUserProfile, userData, user, createNewRequest,
      loading, errors, closeModal, shouldOpen, modalType,
      roleUsers, requestOnEdit, editRequest, fetchUserRequests,
      fetchPostUserData, creatingRequest, centers,
      fetchAvailableRooms, availableRooms, fetchAvailableRoomsSuccess
    } = this.props;
    const { result: { location }} = userData;
    const { url } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="81.95%"
        visibility={(shouldOpen && (modalType === 'new request'))
          ? 'visible' : 'invisible'
        }
        title="New Travel Request"
      >
        <NewRequestForm
          availableRooms={availableRooms} centers={centers && centers.centers}
          closeModal={closeModal} creatingRequest={creatingRequest} errors={errors}
          loading={loading} fetchAvailableRooms={fetchAvailableRooms}
          fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
          fetchUserRequests={() => fetchUserRequests(url)} handleCreateRequest={createNewRequest}
          handleEditRequest={editRequest} managers={roleUsers} modalType={modalType}
          requestOnEdit={{...requestOnEdit, location}} updateUserProfile={updateUserProfile}
          user={user} userData={userData && userData.result} userDataUpdate={fetchPostUserData}
        />
      </Modal>
    );
  }

  render() {
    const { requests, isFetching, teammates } = this.props;
    return (
      <div>
        <h1 className="home-title">HOME</h1>
        <div className="home">
          <GetStarted />
          <div className="overview">
            <Teammates teammates={teammates} />
            <HomeRequests
              isLoading={isFetching}
              requests={requests}
              openModal={this.handleOpenModal}
            />
            {this.renderNewRequestForm()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  requests, user, role, availableRooms,
  occupations, modal, teammates, centers
}) => ({
  ...requests,
  ...role,
  ...occupations,
  ...modal.modal,
  centers,
  teammates: teammates,
  isFetching: requests.isLoading,
  userData: user.getUserData,
  availableRooms,
  fetchPostUserData: user.postUserData,
  department: user.currentUser.department
});

const actionCreators = {
  closeModal,
  createNewRequest,
  editRequest,
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchCenters,
  fetchRoleUsers,
  fetchTeammates,
  fetchUserRequests,
  getOccupation,
  openModal,
  updateUserProfile,
};

Home.propTypes = {
  availableRooms: PropTypes.object,
  centers: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  createNewRequest: PropTypes.func.isRequired,
  creatingRequest: PropTypes.bool,
  department: PropTypes.string,
  editRequest: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired,
  fetchPostUserData: PropTypes.array,
  fetchRoleUsers: PropTypes.func.isRequired,
  fetchTeammates: PropTypes.func.isRequired,
  fetchUserRequests: PropTypes.func.isRequired,
  fetchCenters: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  requestOnEdit: PropTypes.object,
  requests: PropTypes.array,
  roleUsers: PropTypes.array,
  shouldOpen: PropTypes.bool,
  teammates: PropTypes.object,
  updateUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,
};

Home.defaultProps = {
  availableRooms: {},
  centers: {},
  creatingRequest: false,
  department: '',
  fetchPostUserData: [],
  isFetching: false,
  location: { url: '' },
  modalType: '',
  requestOnEdit: {},
  requests: [],
  roleUsers: [],
  shouldOpen: true,
  teammates: {},
  user: {},
  userData: {},
};

export default connect(mapStateToProps, actionCreators)(Home);
