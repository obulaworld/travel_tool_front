import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Base from '../../Base';
import { NewRequestForm } from '../../../components/Forms';
import {
  fetchAvailableRooms, fetchAvailableRoomsSuccess
} from '../../../redux/actionCreator/availableRoomsActions';
import {
  fetchUserRequests, createNewRequest, editRequest,
} from '../../../redux/actionCreator/requestActions';
import updateUserProfile from '../../../redux/actionCreator/userProfileActions';
import { openModal } from '../../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../../redux/actionCreator/roleActions';
import { getOccupation } from '../../../redux/actionCreator/occupationActions';
import {fetchAllTravelReasons} from '../../../redux/actionCreator/listTravelReasonsActions';


export class NewRequests extends Base {
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
    const { fetchRoleUsers, fetchAllTravelReasons } = this.props;
    fetchRoleUsers(53019);
    fetchAllTravelReasons('');
  }

  render() {
    const {
      updateUserProfile, userData, fetchPostUserData,
      user, createNewRequest, listTravelReasons,
      loading, errors,
      modalType, roleUsers, requestOnEdit, editRequest,
      fetchUserRequests, occupations,
      fetchAvailableRooms, availableRooms, fetchAvailableRoomsSuccess, creatingRequest,
      fetchAllTravelReasons, history
    } = this.props;
    const { url } = this.state;
    return (
      <NewRequestForm
        updateUserProfile={updateUserProfile} user={user} errors={errors}
        userData={userData && userData.result} occupations={occupations}
        handleCreateRequest={createNewRequest}
        handleEditRequest={editRequest} loading={loading}
        managers={roleUsers} availableRooms={availableRooms} modalType={modalType}
        fetchAvailableRooms={fetchAvailableRooms}
        fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
        creatingRequest={creatingRequest}
        userDataUpdate={fetchPostUserData}
        fetchAllTravelReasons={fetchAllTravelReasons}
        listTravelReasons={listTravelReasons}
        requestOnEdit={requestOnEdit} fetchUserRequests={() => fetchUserRequests(url)}
        history={history}
      />
    );
  }
}

const mapStateToProps = ({requests, user, role, availableRooms, occupations, modal, teammates, travelReason}) => ({
  ...requests,
  ...role,
  ...occupations,
  ...modal.modal,
  teammates: teammates,
  isFetching: requests.isLoading,
  userData: user.getUserData,
  availableRooms,
  department: user.currentUser.department,
  listTravelReasons: travelReason,
});

const actionCreators = {
  fetchUserRequests,
  updateUserProfile,
  createNewRequest,
  editRequest,
  openModal,
  fetchAvailableRooms,
  fetchAvailableRoomsSuccess,
  fetchRoleUsers,
  getOccupation,
  fetchAllTravelReasons,
};

export default connect(mapStateToProps, actionCreators)(NewRequests);
