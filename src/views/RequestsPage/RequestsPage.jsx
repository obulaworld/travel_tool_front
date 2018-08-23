import React, { Component } from  'react';
import {PropTypes} from 'prop-types';

import './_index.scss';
import upic from '../../images/upic.svg';

import Requests from '../../components/Requests/Requests';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import requestsData from '../../components/Requests/requestsData';
import NavBar from '../../components/nav-bar/NavBar';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Modal from '../../components/modal/Modal';
import { NewRequestForm } from '../../components/Forms';

class RequestsPage extends Component {
  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    hideNewRequestModal: true
  }
  // FIX: Remove console statement and replace with actual function
  onPageChange (page) {
    console.log('Page Change function', page); /*eslint-disable-line */
  }

  // FIX: Change the function name and dont make the state toggle
  onNotificationToggle = () => {
    this.setState({
      hideNotificationPane: false,
      hideSideBar: true,
    });
  };

  onCloseNotificationPane = () => {
    this.setState({
      hideNotificationPane: true,
      hideSideBar: false
    });
  }

  toggleNewRequestModal = (e) => {
    const { hideNewRequestModal } = this.state;

    this.setState(prevState => {
      return {
        ...prevState,
        hideNewRequestModal: !hideNewRequestModal
      };
    });
  }

  renderNavBar = () => {
    return (
      <NavBar
        className=""
        avatar={upic}
        onNotificationToggle={this.onNotificationToggle}
      />
    );
  }

  renderLeftSideBar = (hideClass2) => {
    return (
      <div className={`sidebar ${hideClass2}`}>
        <LeftSideBar />
      </div>
    );
  }

  renderRequestPanelHeader = () => {
    return(
      <div className="rp-requests__header">
        <RequestPanelHeader toggleNewRequestModal={this.toggleNewRequestModal} />
      </div>
    );
  }

  renderRequests = (requests) => {
    return(
      <div className="rp-table">
        <Requests requests={requests} />
      </div>
    );
  }

  renderPagination = (pagination) => {
    return(
      <div className="rp-pagination">
        <Pagination
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }

  renderNotificationPane = (hideClass) => {
    return(
      <div className={`notification ${hideClass}`}>
        <NotificationPane
          onCloseNotificationPane={this.onCloseNotificationPane}
        />
      </div>
    );
  }

  renderNewRequestForm = (hideNewRequestModal) => {
    const {user} = this.props;
    return (
      <Modal
        toggleModal={this.toggleNewRequestModal}
        visibility={hideNewRequestModal? 'invisible': 'visible'}
        title="New Travel Request"
      >
        <NewRequestForm user={user} handleCreateRequest={(formData)=>{}} />
      </Modal>
    );
  }

  render() {
    const { hideNotificationPane, hideSideBar, hideNewRequestModal } = this.state;
    let [hideClass, leftPaddingClass] = hideNotificationPane? ['hide', '']: ['', 'pd-left'];

    const hideClass2 = hideSideBar ? 'hide' : '';
    const { requests, pagination } = requestsData;

    return(
      <div className="requests-page">
        {this.renderNavBar()}
        {this.renderNewRequestForm(hideNewRequestModal)}
        <section className="main-section">
          {this.renderLeftSideBar(hideClass2)}
          <div className={`rp-requests ${leftPaddingClass}`}>
            {this.renderRequestPanelHeader()}
            {this.renderRequests(requests)}
            {this.renderPagination(pagination)}
          </div>
          {this.renderNotificationPane(hideClass)}
        </section>
      </div>
    );
  }
}

RequestsPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RequestsPage;
