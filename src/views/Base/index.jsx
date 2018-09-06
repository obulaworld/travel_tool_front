import React, { Component } from 'react';
import ConnectedLeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Pagination from '../../components/Pagination/Pagination';
import ConnectedNavBar from '../../components/nav-bar/NavBar';
import NotificationPane from '../../components/notification-pane/NotificationPane';
import upic from '../../images/upic.svg';
import ConnectedSideDrawer from '../../components/SideDrawer/SideDrawer';
import '../RequestsPage/RequestsPage.scss';

class Base extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * the notification pane and the left sidebar dont
   */
  onNotificationToggle = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        hideNotificationPane: !prevState.hideNotificationPane,
        hideSideBar: !prevState.hideSideBar
      };
    });
  };

  onCloseNotificationPane = () => {
    this.setState(() => {
      return {
        hideNotificationPane: true,
        hideSideBar: false
      };
    });
  };

  handleHideSearchBar = () => {
    this.setState(prevState => {
      this.setState({ openSearch: !prevState.openSearch });
    });
  };

  handleOverlay = () => {
    this.setState({ hideOverlay: false });
  };

  handleShowDrawer = () => {
    this.setState({ hideOverlay: true });
  };

  renderNavBar = openSearch => {
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

  renderLeftSideBar = (hideSideBar,  selectedLink) => {
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    return (
      <div
        className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>
          
        <div className={`sidebar ${hideClass2}`}>
          <ConnectedLeftSideBar selectedLink={selectedLink} />
        </div>


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

  renderNotificationPane = (hideClass, hideSideBar) => {
    
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    return (
      <div
        className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3} request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}
      >
        <div className={`notification ${hideClass}`}>
          <NotificationPane
            onCloseNotificationPane={this.onCloseNotificationPane}
          />
        </div>
      </div>
    );
  };

  renderSideDrawer = (selectedLink, showDrawer) => {
    return (
      <ConnectedSideDrawer
        selectedLink={selectedLink}
        showDrawer={showDrawer}
      />
    );
  };

  renderOverlay = (overlayClass) => {
    return (
      <div
        className="side_overlay"
        style={{ display: `${overlayClass}` }}
        role="button"
        onClick={this.handleOverlay}
        onKeyPress={() => {}}
        tabIndex="0"
      />
    );
  };
}

export default Base;
