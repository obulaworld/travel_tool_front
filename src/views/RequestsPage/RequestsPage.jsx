import React, { Component } from  'react';
import Requests from '../../components/Requests/Requests';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import requestsData from '../../components/Requests/requestsData';
import NavBar from '../../components/nav-bar/NavBar';
import upic from '../../images/upic.svg';
import './_index.scss';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';

class RequestsPage extends Component {
  // FIX: Remove console statement and replace with actual function
  onPageChange = (page) => {
    console.log('Page Change function', page); /*eslint-disable-line */
  }

  render() {
    const onNotificationToggle = () => ('Notification icon toggled');
    const { requests, pagination } = requestsData;
    return(
      <div>
        <RequestPanelHeader />
        <NavBar avatar={upic} onNotificationToggle={onNotificationToggle} />
        <LeftSideBar />
        <NotificationPane />
        <Requests requests={requests} />
        <Pagination
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}


export default RequestsPage;
