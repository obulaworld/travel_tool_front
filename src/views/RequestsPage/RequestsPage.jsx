
import React from  'react';
import {PropTypes} from 'prop-types';
import Table from '../../components/Table';
import requestsData from '../../mockData/requestsMockData';
import RequestPanelHeader from '../../components/RequestPanelHeader/RequestPanelHeader';
import Modal from '../../components/modal/Modal';
import { NewRequestForm } from '../../components/Forms';

import Base from '../Base';

class RequestsPage extends Base {

  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    closeDrawerClass: '',
    openSearch: false,
    hideNewRequestModal: true
  };

  //FIX: Remove console statement and replace with actual function
  onPageChange() {
    true;
  }

  // FIX: Change the function name and dont make the state toggle
  onNotificationToggle = () => {
    this.setState({
      hideNotificationPane: false,
      hideSideBar: true
    });
  }

  
  onCloseNotificationPane = () => {
    this.setState({
      hideNotificationPane: true,
      hideSideBar: false
    });
  };
  
  handleClose = () => {
    this.setState({closeDrawerClass: 'mdl-cell--hide-tablet'}, ()=>{
    });
  }

  handleHideSearchBar = () => {
    this.setState((prevState) => {
      this.setState({openSearch: !prevState.openSearch});
    });
  }
  
  toggleNewRequestModal = () => {
    const { hideNewRequestModal } = this.state;
    this.setState(prevState => {
      return {
        ...prevState,
        hideNewRequestModal: !hideNewRequestModal
      };
    });
  }

  

  render() {
    const { hideNotificationPane, hideSideBar, closeDrawerClass, hideNewRequestModal, openSearch } = this.state;
    let [hideClass, leftPaddingClass] = hideNotificationPane? ['hide', '']: ['', 'pd-left'];
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    const { requests, pagination } = requestsData;
    return (
      <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
        {this.renderSideDrawer(closeDrawerClass)} 
        {this.renderNavBar(openSearch)}
        {this.renderNewRequestForm(hideNewRequestModal)}
        {this.renderRequestPage(hideClass2,leftPaddingClass, requests, pagination, hideClass, hideClass3 )}
      </div>
    );
  }

}

export default RequestsPage;
