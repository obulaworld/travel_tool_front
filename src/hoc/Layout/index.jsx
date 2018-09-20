import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { Link } from 'react-router-dom';
import ConnectedNavBar from '../../components/nav-bar/NavBar';
import ConnectedLeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import ConnectedNotificationPane from '../../components/notification-pane/NotificationPane';
import ConnectedSideDrawer from '../../components/SideDrawer/SideDrawer';
import upic from '../../images/upic.svg';
import RequireAuth from '../authHoc';
import './Layout.scss';

export class Layout extends Component {

  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    hideOverlay: true,
  }

  onNotificationToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      hideNotificationPane: !prevState.hideNotificationPane,
      hideSideBar: !prevState.hideSideBar
    }));
  };

  handleHideSearchBar = () => {
    this.setState(prevState => ({
      ...prevState,
      openSearch: !prevState.openSearch
    }));
  };

  handleOverlay = () => {
    this.setState({ hideOverlay: true });
  };

  handleShowDrawer = () => {
    this.setState({ hideOverlay: false });
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

  renderLeftSideBar = (hideSideBar) => {
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    const {location} = this.props;
    return (
      <div
        className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>

        <div className={`sidebar ${hideClass2}`}>
          <ConnectedLeftSideBar location={location} />
        </div>


      </div>
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

  renderNotificationPane = (hideClass, hideSideBar) => {
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    return (
      <div
        className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3} request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}
      >
        <div className={`notification ${hideClass}`}>
          <ConnectedNotificationPane
            onCloseNotificationPane={this.onNotificationToggle}
          />
        </div>
      </div>
    );
  };

  renderSideDrawer = (showDrawer) => {
    const {location} = this.props;
    return (
      <ConnectedSideDrawer
        showDrawer={showDrawer}
        location={location}
        handleShowDrawer={this.handleOverlay}
      />
    );
  };

  render () {
    const {children} = this.props;
    const { hideOverlay, openSearch } = this.state;
    const overlayClass = hideOverlay ? 'none': 'block';
    const { hideNotificationPane, hideSideBar } = this.state;
    const [hideClass, leftPaddingClass] = hideNotificationPane
      ? ['hide', '']
      : ['', 'pd-left'];

    return (
      <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button"
      >
        {this.renderOverlay(overlayClass)}
        {this.renderSideDrawer(overlayClass)}
        {this.renderNavBar(openSearch)}

        <div className="mdl-layout__content full-height">
          <div className="mdl-grid mdl-grid--no-spacing full-height">
            {this.renderLeftSideBar(hideSideBar)}
            <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <div className={`rp-requests ${leftPaddingClass}`}>
                {children}
              </div>
            </div>
          </div>
          {this.renderNotificationPane(hideClass, hideSideBar)}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default RequireAuth(Layout);
