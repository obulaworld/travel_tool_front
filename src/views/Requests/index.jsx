import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLoadingTable from '../../components/Table';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Utils from '../../helper/Utils';
import Modal from '../../components/modal/Modal';
import Base from '../Base';
import { NewRequestForm } from '../../components/Forms';
import {
  fetchUserRequests,
  createNewRequest
} from '../../redux/actionCreator/requestActions';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';


export class Requests extends Base {

  constructor (props){
    super(props);
  }
  state = {
    hideNewRequestModal: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    url: this.props.location.search,
    requestId: ''
  };

  componentDidMount() {
    const { openModal, fetchUserRequests, fetchRoleUsers, page, match: { params: { requestId} } } = this.props;
    const { url } = this.state;
    fetchUserRequests(url);
    fetchRoleUsers(53019);

    if(requestId){  
      openModal(true, 'request details', page);
      this.storeRequestIdRequest(requestId);
    }
  }

  componentDidUpdate(){
    const {getUserData}=this.props;
    const data = getUserData.result;
    localStorage.setItem('passportName', data && data.passportName);
    localStorage.setItem('gender', data && data.gender);
    localStorage.setItem('department', data && data.department);
    localStorage.setItem('role', data && data.occupation);
    localStorage.setItem('manager', data && data.manager);
  }

  fetchRequests = query => {
    const { history, fetchUserRequests } = this.props;
    history.push(`/requests${query}`);
    fetchUserRequests(query);
    this.setState(prevState => ({
      ...prevState,
      activeStatus: Utils.getActiveStatus(query),
      searchQuery: query
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
  }

  storeRequestIdRequest = (requestId)=> {
    this.setState({requestId: requestId});
  }

  renderRequestPanelHeader() {
    const {
      openRequestsCount,
      requests,
      pastRequestsCount,
      openModal,
      shouldOpen,
      modalType
    } = this.props;
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
    const { history, location, openModal, closeModal, shouldOpen, modalType } = this.props;
    const {requestId} = this.state;
    return (
      <div className="rp-table">
        <WithLoadingTable
          type="requests"
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
        />
      </div>
    );
  }
  renderNewRequestForm() {
    const {
      updateUserProfile,
      user,
      createNewRequest,
      loading,
      errors,
      closeModal,
      shouldOpen,
      modalType,
      manager,
    } = this.props;

    return (
      <Modal
        closeModal={closeModal}
        width="1000px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="New Travel Request"
      >
        <NewRequestForm
          updateUserProfile={updateUserProfile}
          user={user}
          handleCreateRequest={createNewRequest}
          loading={loading}
          errors={errors}
          closeModal={closeModal}
          managers={manager}
        />
      </Modal>
    );
  }

  renderRequestPage() {
    const {isLoading, requests, pagination, fetchRequestsError, message} = this.props;
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
  creatingRequest: PropTypes.bool,
  errors: PropTypes.array,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired
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

export const mapStateToProps = ({ requests, modal, role, user }) => ({
  ...requests,
  ...modal.modal,
  ...role,
  getUserData: user.getUserData
});

const actionCreators = {
  fetchUserRequests,
  createNewRequest,
  fetchRoleUsers,
  openModal,
  closeModal,
  updateUserProfile,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Requests);
