import React, { Component } from  'react';
import {PropTypes} from 'prop-types';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import upic from '../../images/upic.svg';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Table from '../../components/Table';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { NewRequestForm } from '../../components/Forms';
import Modal from '../../components/modal/Modal';
import ConnectedNavBar from '../../components/nav-bar/NavBar';

class Base extends Component {

  renderNavBar = (openSearch) => {
    return (
      <ConnectedNavBar
        className=""
        avatar={upic}
        onNotificationToggle={this.onNotificationToggle}
        handleHideSearchBar={this.handleHideSearchBar}
        openSearch={openSearch}
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

  renderRequestPanelHeader = () => {
    return (
      <div className="rp-requests__header">
        <RequestPanelHeader toggleNewRequestModal={this.toggleNewRequestModal} />
      </div>
    );
  }

  renderRequests = (requests) => {
    return (
      <div className="rp-table">
        <Table requests={requests} />
      </div>
    );
  }

  renderSideDrawer = (closeDrawerClass) => {
    return (
      <SideDrawer />
    );
  }


renderRequestPage = (hideClass2,leftPaddingClass, requests, pagination, hideClass, hideClass3 ) => {
  return(
    <div className="mdl-layout__content full-height">
      <div className="mdl-grid mdl-grid--no-spacing full-height">
        <div className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>
          {this.renderLeftSideBar(hideClass2)}       
        </div>
        <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
          <div className={`rp-requests ${leftPaddingClass}`}>
            {this.renderRequestPanelHeader()}
            {this.renderRequests(requests)}
            {this.renderPagination(pagination)}
          </div>
        </div>
        <div className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3} request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}>
          {this.renderNotificationPane(hideClass)}
        </div>
      </div>
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



}

Base.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Base;
