import React, {Fragment}  from  'react';
import {connect} from 'react-redux';
import ApprovalsPanelHeader from '../../components/ApprovalsPanelHeader';
import { fetchUserApprovals } from '../../redux/actionCreator/approvalActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import WithLoadingTable from '../../components/Table';
import Base from '../Base';
import Utils from '../../helper/Utils';

export class Approvals extends Base {

  state = {
    hideNotificationPane: true,
    hideSideBar: false,
    openSearch: false,
    hideOverlay: false,
    clickPage: true,
    activeStatus: Utils.getActiveStatus(this.props.location.search),
    selectedLink: 'approval page',
    searchQuery:  this.props.location.search
  }

  componentDidMount () {
    const {fetchUserApprovals} = this.props;
    const { searchQuery } = this.state;
    fetchUserApprovals(searchQuery);
  }

  componentWillReceiveProps (nextProps) {
    const searchQuery = nextProps.location.search;
    this.setState(prevState => ({
      ...prevState,
      searchQuery
    }));
  }

  renderApprovalsTable(){
    const { approvals, openModal, closeModal, shouldOpen, modalType } = this.props;
    // console.log(openModal)
    return(
      <WithLoadingTable
        requests={approvals.approvals}
        isLoading={approvals.isLoading}
        fetchRequestsError={approvals.fetchApprovalsError}
        message={approvals.message}
        type="approvals"
        closeModal={closeModal}
        openModal={openModal}
        shouldOpen={shouldOpen}
        modalType={modalType}
      />
    );
  }

  fetchFilteredApprovals = (query) => {
    const { history } = this.props;
    history.push(`/requests/my-approvals${query}`);
  }

  onPageChange = (page) => {
    const { searchQuery } = this.state;
    const query = Utils.buildQuery(searchQuery, 'page', page);
    this.fetchFilteredApprovals(query);
  }

  getApprovalsWithLimit = (limit) => {
    const { searchQuery } = this.state;
    const { approvals } = this.props;
    this.getEntriesWithLimit(limit, searchQuery, approvals.pagination, this.fetchFilteredApprovals);
  }

  renderApprovalsPanelHeader(){
    const { activeStatus, searchQuery } = this.state;
    const { approvals } = this.props;
    const { openApprovalsCount, pastApprovalsCount } = approvals;

    return(
      <div className="rp-requests__header">
        <ApprovalsPanelHeader
          url={searchQuery}
          openApprovalsCount={openApprovalsCount}
          pastApprovalsCount={pastApprovalsCount}
          fetchApprovals={this.fetchFilteredApprovals}
          getApprovalsWithLimit={this.getApprovalsWithLimit}
          activeStatus={activeStatus}
          approvalsLength={approvals.approvals.length}
        />
      </div>
    );
  }

  renderApprovalPage () {
    const { hideNotificationPane, hideSideBar, selectedLink } = this.state;
    let [hideClass, leftPaddingClass] = hideNotificationPane
      ? ['hide', '']
      : ['', 'pd-left'];
    const {approvals} = this.props;

    return (
      <div className="mdl-layout__content full-height">
        <div
          className="mdl-grid mdl-grid--no-spacing full-height"
          onClick={this.handleHideLogoutDropdown} id="logout" role="presentation">

          {this.renderLeftSideBar(hideSideBar, selectedLink)}

          <div className="mdl-cell mdl-cell--9-col-desktop request-page__table-view mdl-cell--8-col-tablet mdl-cell--4-col-phone">
            <div className={`rp-requests ${leftPaddingClass}`}>
              {this.renderApprovalsPanelHeader()}
              {approvals.approvals && this.renderApprovalsTable()}
              {!approvals.isLoading && approvals.approvals.length > 0 && this.renderPagination(approvals.pagination)}
            </div>
          </div>
          {this.renderNotificationPane(hideClass, hideSideBar)}
        </div>
      </div>
    );
  }

  render() {
    const { selectedLink, hideOverlay, openSearch } = this.state;
    const overlayClass = hideOverlay ? 'block': 'none';
    return(
      <div>
        <div
          className="side_overlay"
          style={{display: `${overlayClass}`}} role="button"
          onClick={this.handleOverlay}
          onKeyPress={() => {}} tabIndex="0" />
        <div className="mdl-layout mdl-js-layout request-page mdl-layout--no-desktop-drawer-button"
        >
          {this.renderSideDrawer(selectedLink, overlayClass)}
          {this.renderNavBar(openSearch)}
          {this.renderApprovalPage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  approvals: state.approvals,
  ...state.modal.modal
});

const actionCreators = {
  fetchUserApprovals,
  openModal,
  closeModal
};

export default connect(mapStateToProps, actionCreators)(Approvals);
