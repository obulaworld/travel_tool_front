import React from  'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLoadingTable from '../../components/Table';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Utils from '../../helper/Utils';
import Modal from '../../components/modal/Modal';
import Base from '../Base';
import { NewRequestForm } from '../../components/Forms';
import { fetchUserRequests, createNewRequest } from '../../redux/actionCreator/requestActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';

export class RequestsPage extends Base {
  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    hideNewRequestModal: true,
    selectedLink: 'request page',
    limit: 10,
  };

  componentDidMount() {
    const { fetchUserRequests } = this.props;
    fetchUserRequests('?page=1');
  }

  onPageChange = (page) => {
    const { fetchUserRequests, url } = this.props;
    const query = Utils.addOrReplaceQuery(url, 'page', page);
    fetchUserRequests(query);
  }

  renderRequestPanelHeader() {
    const { openRequestsCount, fetchUserRequests, requests, pastRequestsCount, openModal, shouldOpen, modalType } = this.props;
    const { limit } = this.state;

    return (
      <div className="rp-requests__header">
        <RequestPanelHeader
          openRequestsCount={openRequestsCount}
          fetchUserRequests={fetchUserRequests}
          requests={requests}
          pastRequestsCount={pastRequestsCount}
          getRequestsWithLimit={this.getRequestsWithLimit}
          limit={limit}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
        />
      </div>
    );
  }

  renderRequests(requests, isLoading, error) {
    const { openModal, closeModal, shouldOpen, modalType } = this.props;

    return(
      <div className="rp-table">
        <WithLoadingTable
          requests={requests}
          isLoading={isLoading}
          fetchRequestsError={error}
          closeModal={closeModal}
          openModal={openModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
        />
      </div>
    );
  }

  getRequestsWithLimit = (limit) => {
    this.setState({
      limit
    });
    const { fetchUserRequests, url } = this.props;
    const query = Utils.addOrReplaceQuery(url, 'limit', limit);
    fetchUserRequests(query);
  }

  renderNewRequestForm(shouldOpen, modalType) {
    const { user, createNewRequest, loading, errors, closeModal } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        visibility={shouldOpen && (modalType === 'new request') ? 'visible' : 'invisible'}
        title="New Travel Request"
      >
        <NewRequestForm
          user={user}
          handleCreateRequest={createNewRequest}
          loading={loading}
          errors={errors}
          closeModal={closeModal}
        />
      </Modal>
    );
  }

  renderRequestPage(hideClass2,leftPaddingClass, hideClass, hideClass3, selectedLink ){
    const { isLoading, requests, pagination, fetchRequestsError } = this.props;
    return(
      <div className="mdl-layout__content full-height">
        <div className="mdl-grid mdl-grid--no-spacing full-height">
          <div className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>
            {this.renderLeftSideBar(hideClass2, selectedLink)}
          </div>
          <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            <div className={`rp-requests ${leftPaddingClass}`}>
              {this.renderRequestPanelHeader()}
              {requests && this.renderRequests(requests, isLoading, fetchRequestsError)}
              {!isLoading && pagination && this.renderPagination(pagination)}
            </div>
          </div>
          <div className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3} request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}>
            {this.renderNotificationPane(hideClass)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { hideNotificationPane, hideSideBar, selectedLink, openSearch } = this.state;
    const { shouldOpen, modalType } = this.props;
    let [hideClass, leftPaddingClass] = hideNotificationPane ? ['hide', '']: ['', 'pd-left'];
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    return(
      <div>
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
          {this.renderSideDrawer(selectedLink)}
          {this.renderNavBar(openSearch)}
          {this.renderNewRequestForm(shouldOpen, modalType)}
          {this.renderRequestPage(hideClass2,leftPaddingClass, hideClass, hideClass3, selectedLink )}
        </div>
      </div>
    );
  }
}

RequestsPage.propTypes = {
  user: PropTypes.object,
  fetchUserRequests: PropTypes.func.isRequired,
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
  openModal: PropTypes.func.isRequired,
};

RequestsPage.defaultProps = {
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

export const mapStateToProps = ({ requests, modal }) => ({
  ...requests,
  ...modal.modal,
});

const actionCreators = {
  fetchUserRequests,
  createNewRequest,
  openModal,
  closeModal
};

export default connect(mapStateToProps, actionCreators)(RequestsPage);
