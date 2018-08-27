import React, { Component } from  'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import upic from '../../images/upic.svg';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import ConnectedNavBar from '../../components/nav-bar/NavBar';

class Base extends Component {
  handleHideSearchBar = () => {
    this.setState((prevState) => {
      this.setState({openSearch: !prevState.openSearch});
    });
  }
  
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

 

  renderLeftSideBar = (hideClass2, selectedLink) => {
    return (
      <div className={`sidebar ${hideClass2}`}>
        <LeftSideBar selectedLink={selectedLink} />
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

  renderSideDrawer = (selectedLink) => {
    return (<SideDrawer selectedLink={selectedLink} />);
  }
}





export default Base;
