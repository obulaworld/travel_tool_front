import React  from  'react';
import ApprovalsPanelHeader from '../../components/ApprovalsPanelHeader';
import requestsData from '../../mockData/requestsMockData';
import Table from '../../components/Table';
import Base from '../Base';

class Approvals extends Base {

  state = {
    hideNotificationPane: true,
    hideSideBar: false
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

  renderApprovalsTable(){
    return(
      <Table requests={requestsData.requests} avatar="image" />
    );
  }

  renderApprovalsPanelHeader(){
    return(
      <div className="rp-requests__header">
        <ApprovalsPanelHeader />
      </div>
    );
  }

  render() {
    const { hideNotificationPane, hideSideBar } = this.state;
    let hideClass, leftPaddingClass;
    if(hideNotificationPane) {
      hideClass = 'hide';
      leftPaddingClass = '';
    } else {
      hideClass = '';
      leftPaddingClass = 'pd-left';
    }
    const hideClass2 = hideSideBar ? 'hide' : '';
    const { requests, pagination } = requestsData;
    return(
      <div className="requests-page">
        {this.renderNavBar()}
        <section className="main-section">
          {this.renderLeftSideBar(hideClass2)}
          <div className={`rp-requests ${leftPaddingClass}`}>
            {this.renderApprovalsPanelHeader()}
            {this.renderApprovalsTable()}
            {this.renderPagination(pagination)}
          </div>
          {this.renderNotificationPane(hideClass)}
        </section>
      </div>
    );
  }
}


export default Approvals;



