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

  renderRequestPanelHeader(){
    return(
      <div className="rp-requests__header">
        <RequestPanelHeader toggleNewRequestModal={this.toggleNewRequestModal} />
      </div>
    );
  }

  renderRequests(requests) {
    return(
      <div className="rp-table">
        <Table requests={requests} />
      </div>
    );
  }

  renderNewRequestForm(hideNewRequestModal){
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
