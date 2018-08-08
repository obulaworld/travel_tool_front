import React, { Component } from  'react';
import Requests from '../../components/Requests/Requests';
import Pagination from '../../components/Pagination/Pagination';
import requestsData from '../../components/Requests/requestsData';
import './_index.scss';
import NotificationPane from '../../components/notification-pane/NotificationPane';

class RequestsPage extends Component {
  // FIX: Remove console statement and replace with actual function
  onPageChange(page){
    console.log('Page Change function', page); /*eslint-disable-line */
  }

  render() {
    const { requests, pagination } = requestsData;
    return(
      <div>
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
