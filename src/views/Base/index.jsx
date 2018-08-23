import React, { Component } from  'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import ConnectedNavBar from '../../components/nav-bar/NavBar';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import upic from '../../images/upic.svg';

class Base extends Component {

  renderNavBar = () => {
    return (
      <ConnectedNavBar
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
}

export default Base;
