import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLoadingTable from '../../components/Table';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Utils from '../../helper/Utils';
import Modal from '../../components/modal/Modal';
import Base from '../Base';
import { NewRequestForm } from '../../components/Forms';
import {fetchUserRequests,createNewRequest,editRequest,fetchEditRequest,fetchUserRequestDetails,} from '../../redux/actionCreator/requestActions';
import { fetchAvailableRooms, fetchAvailableRoomsSuccess } from '../../redux/actionCreator/availableRoomsActions';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';
import { fetchTravelChecklist } from '../../redux/actionCreator/travelChecklistActions';
import { fetchSubmission, postSubmission } from '../../redux/actionCreator/checkListSubmissionActions';


export class Requests extends Base {
  constructor(props) {
    super(props);
  }
  state = {
    hideNewRequestModal: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    url: this.props.location.search,
    requestForEdit: null,
    requestId: ''
  };

  componentDidMount() {
    const {openModal, fetchUserRequests, fetchAvailableRooms, getOccupation, fetchRoleUsers, page,
      match: {
        params: { requestId }
      }
    } = this.props;
    const { url } = this.state;
    fetchUserRequests(url);
    fetchRoleUsers(53019);
    getOccupation();
    fetchAvailableRooms();
    if (requestId) {
      openModal(true, 'request details', page);
      this.storeRequestIdRequest(requestId);
    }
  }

  handleEditRequest = (requestId, newRequest) => {
    const { openModal, fetchEditRequest } = this.props;
    fetchEditRequest(requestId);
    openModal(true, 'edit request');
  }

  handleShowTravelChecklist = (requestId) => {
    const { fetchTravelChecklist, openModal } = this.props;
    fetchTravelChecklist(requestId);
    openModal(true, 'travel checklist');
  }
  
  handleUploadSubmissionModal = (request) => {
    const {openModal, fetchEditRequest } = this.props;
    fetchUserRequestDetails(request.id);
    openModal(true, 'upload submissions');
  }

  handleFetchTravelChecklist = (requestId) => {
    const { fetchTravelChecklist } = this.props;
    fetchTravelChecklist(requestId);
  }

  fetchRequests = query => {
    const { history, fetchUserRequests, location } = this.props;
    history.push(`/requests${query}`);
    fetchUserRequests(query);
    this.setState(prevState => ({
      ...prevState,
      activeStatus: Utils.getActiveStatus(query),
      searchQuery: query,
      url: query
    }));
  };

  onPageChange = page => {
    const { url } = this.state;
    const query = Utils.buildQuery(url, 'page', page);
    this.fetchRequests(query);
  };

  getRequestsWithLimit = limit => {
    const { url } = this.state;
    const { pagination } = this.props;
    this.getEntriesWithLimit(limit, url, pagination, this.fetchRequests);
  };

  storeRequestIdRequest = requestId => {
    this.setState({ requestId: requestId });
  };

  renderRequestPanelHeader() {
    const {openRequestsCount,requests,pastRequestsCount,openModal,shouldOpen,modalType} = this.props;
    const { url, activeStatus } = this.state;
    return (
      <div className="rp-requests__header">
        <RequestPanelHeader
          openRequestsCount={openRequestsCount}
          fetchRequests={this.fetchRequests}
          requestsLength={requests.length}
          pastRequestsCount={pastRequestsCount}
          getRequestsWithLimit={this.getRequestsWithLimit}
          url={url}
          activeStatus={activeStatus}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
        />
      </div>
    );
  }

  renderRequests(requests, isLoading, error, message) {
    const {
      history, location, openModal, closeModal, shouldOpen, modalType ,
      travelChecklists, fetchSubmission, postSubmission, submissionInfo,
      isFetching, requestData } = this.props;
    const { requestId } = this.state;
    return (
      <div className="rp-table">
        <WithLoadingTable
          type="requests"
          editRequest={this.handleEditRequest}
          travelChecklists={travelChecklists}
          fetchTravelChecklist={this.handleFetchTravelChecklist}
          showTravelChecklist={this.handleShowTravelChecklist}
          uploadTripSubmissions={this.handleUploadSubmissionModal}
          location={location}
          history={history}
          requestId={requestId}
          requests={requests}
          isLoading={isLoading}
          fetchRequestsError={error}
          closeModal={closeModal}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          message={message}
          page="Requests"
          fetchSubmission={fetchSubmission}
          postSubmission={postSubmission}
          submissionInfo={submissionInfo}
          isFetching={isFetching}
          requestData={requestData}
        />
      </div>
    );
  }
  renderNewRequestForm() {
    const {updateUserProfile,userData, getUserData, user,createNewRequest,loading,errors,closeModal,shouldOpen,
      modalType,managers,requestOnEdit,editRequest,fetchUserRequests,occupations,
      fetchAvailableRooms,  availableRooms, fetchAvailableRoomsSuccess} = this.props;
    const { url } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="81.25%"
        visibility={(shouldOpen && (modalType === 'edit request' || modalType === 'new model')) ? 'visible' : 'invisible'}
        title={modalType === 'edit request' ? 'Edit Travel Request' : 'New Travel Request'}
      >
        <NewRequestForm
          updateUserProfile={updateUserProfile}
          userData={userData && userData.result}
          user={user}
          handleCreateRequest={createNewRequest}
          handleEditRequest={editRequest}
          loading={loading}
          errors={errors}
          closeModal={closeModal}
          managers={managers}
          availableRooms={availableRooms}
          modalType={modalType}
          requestOnEdit={requestOnEdit}
          fetchUserRequests={() => fetchUserRequests(url)}
          fetchAvailableRooms={fetchAvailableRooms}
          occupations={occupations}
          getUserData={getUserData}
          fetchAvailableRoomsSuccess={fetchAvailableRoomsSuccess}
        />
      </Modal>
    );
  }
  renderRequestPage() {
    const { isLoading,requests,pagination,fetchRequestsError,message} = this.props;
    return (
      <Fragment>
        {this.renderRequestPanelHeader()}
        {requests &&
          this.renderRequests(requests, isLoading, fetchRequestsError, message)}
        {!isLoading && requests.length > 0 && this.renderPagination(pagination)}
      </Fragment>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderNewRequestForm()}
        {this.renderRequestPage()}
      </Fragment>
    );
  }
}

Requests.propTypes = {
  user: PropTypes.object,
  fetchUserRequests: PropTypes.func.isRequired,
  fetchRoleUsers: PropTypes.func.isRequired,
  fetchRequestsError: PropTypes.string,
  requests: PropTypes.array,
  pagination: PropTypes.object,
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  isLoading: PropTypes.bool,
  url: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
  createNewRequest: PropTypes.func.isRequired,
  fetchEditRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  creatingRequest: PropTypes.bool,
  errors: PropTypes.array,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired
};
Requests.defaultProps = {
  url: '',
  fetchRequestsError: null,
  requests: [],
  pagination: {},
  isLoading: false,
  creatingRequest: false,
  openRequestsCount: null,
  pastRequestsCount: null,
  errors: [],
  modalType: '',
  user: {}
};
export const mapStateToProps = ({requests, modal, role, user, occupations,
  travelChecklist, availableRooms, submissions }) => ({
  ...requests,
  ...modal.modal,
  ...role,
  ...occupations,
  travelChecklists: travelChecklist.checklistItems,
  userData: user.getUserData,
  availableRooms,
  submissionInfo: submissions
});
const actionCreators = {
  fetchUserRequests,
  createNewRequest,
  fetchEditRequest,
  editRequest,
  fetchRoleUsers,
  openModal,
  closeModal,
  updateUserProfile,
  getOccupation,
  fetchTravelChecklist,
  fetchAvailableRooms,
  fetchSubmission,
  postSubmission,
  fetchAvailableRoomsSuccess
};

export default connect(mapStateToProps,actionCreators)(Requests);
