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
    const { fetchUserRequests, fetchRoleUsers, getOccupation } = this.props;
    fetchUserRequests(url);
    fetchRoleUsers(53019);
    getOccupation();
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
  }

  renderNewRequestForm() {
    const {
      updateUserProfile, userData,
      user, createNewRequest,
      loading, errors, closeModal, shouldOpen,
      modalType, roleUsers, requestOnEdit, editRequest,
      fetchUserRequests, occupations,
      fetchAvailableRooms, availableRooms, fetchAvailableRoomsSuccess, creatingRequest
    } = this.props;
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
          updateUserProfile={updateUserProfile} user={user} errors={errors}
          userData={userData && userData.result} occupations={occupations}
          handleCreateRequest={createNewRequest}
          handleEditRequest={editRequest} loading={loading} closeModal={closeModal}
          managers={roleUsers} availableRooms={availableRooms} modalType={modalType}
          requestOnEdit={requestOnEdit} fetchUserRequests={() => fetchUserRequests(url)}
          fetchAvailableRooms={fetchAvailableRooms}
          fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
          creatingRequest={creatingRequest}
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

const mapStateToProps = ({requests, user, role, availableRooms, occupations, modal, teammates}) => ({
  ...requests,
  ...role,
  ...occupations,
  ...modal.modal,
  teammates: teammates,
  isFetching: requests.isLoading,
  userData: user.getUserData,
  availableRooms,
  department: user.currentUser.department
});

const actionCreators = {
  fetchUserRequests,
  updateUserProfile,
  createNewRequest,
  editRequest,
  openModal,
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  closeModal,
  fetchTeammates,
  fetchRoleUsers,
  getOccupation,
};

Home.propTypes = {
  fetchUserRequests: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  createNewRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchTeammates: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  getOccupation: PropTypes.func.isRequired,
  creatingRequest: PropTypes.bool.isRequired,
  requests: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  teammates: PropTypes.object,
  userData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  roleUsers: PropTypes.array,
  requestOnEdit: PropTypes.object,
  occupations: PropTypes.array,
  availableRooms: PropTypes.object,
  location: PropTypes.object,
  department: PropTypes.string,
  user: PropTypes.object
};

Home.defaultProps = {
  requests: [],
  teammates: {},
  userData: {},
  errors: [],
  shouldOpen: true,
  modalType: '',
  roleUsers: [],
  requestOnEdit: {},
  occupations: [],
  availableRooms: {},
  location: { url: '' },
  user: {},
  department: ''
};

export default connect(mapStateToProps, actionCreators)(Home);
