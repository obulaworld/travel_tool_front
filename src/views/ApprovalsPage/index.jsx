import React, {Fragment}  from  'react';
import ApprovalsPanelHeader from '../../components/ApprovalsPanelHeader';
import requestsData from '../../mockData/requestsMockData';
import Table from '../../components/Table';
import Base from '../Base';

class Approvals extends Base {

  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    selectedLink: 'approval page'
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

  renderApprovalPage (hideClass2,leftPaddingClass, requests, pagination, hideClass, hideClass3, selectedLink ) {
    return (
      <div className="mdl-layout__content full-height">
        <div className="mdl-grid mdl-grid--no-spacing full-height">
          <div className={`mdl-cell mdl-cell--2-col-desktop mdl-cell--hide-tablet mdl-cell--hide-phone request-page__left-side-bar ${hideClass2}`}>
            {this.renderLeftSideBar(hideClass2, selectedLink)}       
          </div>
          <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            <div className={`rp-requests ${leftPaddingClass}`}>
              {this.renderApprovalsPanelHeader()}
              {this.renderApprovalsTable()}
              {this.renderPagination(pagination)}
            </div>
          </div>
          <div className={`mdl-cell mdl-cell--3-col-desktop ${hideClass3} request-page__right-side-bar mdl-cell--3-col-tablet mdl-cell--4-col-phone`}>
            {this.renderNotificationPane(hideClass)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { hideNotificationPane, hideSideBar, openSearch, selectedLink } = this.state;
    let [hideClass, leftPaddingClass] = hideNotificationPane? ['hide', '']: ['', 'pd-left'];
    const hideClass2 = hideSideBar ? 'hide mdl-cell--hide-desktop' : '';
    const hideClass3 = hideSideBar ? '' : 'hide mdl-cell--hide-desktop';
    const { requests, pagination } = requestsData;
    return(
      <div>
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button">
          {this.renderSideDrawer()} 
          {this.renderNavBar(openSearch)}
          {this.renderApprovalPage(hideClass2,leftPaddingClass, requests, pagination, hideClass, hideClass3, selectedLink )}
        </div>
      </div>
    );
  }
}


export default Approvals;



