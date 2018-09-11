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
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';

export class Requests extends Base {
  state = {
    hideNewRequestModal: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    url: this.props.location.search
  };

  componentDidMount() {
    const { fetchUserRequests, fetchRoleUsers } = this.props;
    const { url } = this.state;
    fetchUserRequests(url);
    // Fetch managers
    fetchRoleUsers(53019);
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
    const { openModal, closeModal, shouldOpen, modalType } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingTable
          type="requests"
          requests={requests}
          isLoading={isLoading}
          fetchRequestsError={error}
          closeModal={closeModal}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          message={message}
        />
      </div>
    );
  }

  renderNewRequestForm() {
    const {
      user,
      createNewRequest,
      loading,
      errors,
      closeModal,
      shouldOpen,
      modalType,
      manager
    } = this.props;

    return (
      <Modal
        closeModal={closeModal}
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title="New Travel Request"
      >
        <NewRequestForm
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

export const mapStateToProps = ({ requests, modal, role }) => ({
  ...requests,
  ...modal.modal,
  ...role
});

const actionCreators = {
  fetchUserRequests,
  createNewRequest,
  fetchRoleUsers,
  openModal,
  closeModal
};

export default connect(
  mapStateToProps,
  actionCreators
)(Requests);
