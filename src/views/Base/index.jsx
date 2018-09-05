import React, { Component } from 'react';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import ConnectedNavBar from '../../components/nav-bar/NavBar';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import upic from '../../images/upic.svg';
import ConnectedSideDrawer, { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import '../RequestsPage/RequestsPage.scss';

class Base extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * the notification pane and the left sidebar dont
   */
  onNotificationToggle = () => {
    this.setState((prevState => {
      return {
        ...prevState,
        hideNotificationPane: !prevState.hideNotificationPane,
        hideSideBar: !prevState.hideSideBar,
      };
    }));
  };

  onCloseNotificationPane = () => {
    this.setState(prevState => {
      return {
        hideNotificationPane: true,
        hideSideBar: false
      };
    });
  }

  handleHideSearchBar = () => {
    this.setState((prevState) => {
      this.setState({openSearch: !prevState.openSearch});
    });
  }

  handleOverlay = () => {
    this.setState({ hideOverlay: false,  });
  }

  handleShowDrawer = () => {
    this.setState({ hideOverlay: true });
  }

  renderNavBar = openSearch => {
    const{clickPage} = this.state;
    return (
      <ConnectedNavBar
        className=""
        avatar={upic}
        onNotificationToggle={this.onNotificationToggle}
        handleHideSearchBar={this.handleHideSearchBar}
        openSearch={openSearch}
        handleShowDrawer={this.handleShowDrawer}
      />
    );
  };


  renderLeftSideBar = (hideClass2, selectedLink) => {
    return (
      <div className={`sidebar ${hideClass2}`}>
        <LeftSideBar selectedLink={selectedLink} />
      </div>
    );
  };

  renderPagination = pagination => {
    return (
      <div className="rp-pagination">
        <Pagination
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  };

  renderNotificationPane = hideClass => {
    return (
      <div className={`notification ${hideClass}`}>
        <NotificationPane
          onCloseNotificationPane={this.onCloseNotificationPane}
        />
      </div>
    );
  };

  renderSideDrawer = (selectedLink, showDrawer) => {
    return (<ConnectedSideDrawer selectedLink={selectedLink} showDrawer={showDrawer} />);
  }
}

export default Base;
