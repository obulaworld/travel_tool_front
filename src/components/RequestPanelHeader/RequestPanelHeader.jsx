import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import ButtonGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import './Request.scss';

class RequestPanelHeader extends PureComponent {
  renderButtonGroup = () => {
    const {
      openRequestsCount,
      fetchRequests,
      pastRequestsCount,
      url,
      activeStatus,
    } = this.props;
    return (
      <ButtonGroup
        openRequestsCount={openRequestsCount}
        fetchRequests={fetchRequests}
        pastRequestsCount={pastRequestsCount}
        url={url}
        activeStatus={activeStatus}
        buttonsType="requests"
      />
    );
  };

  render() {
    const { requestsLength, getRequestsWithLimit, openModal, url } = this.props;
    return (
      <div className="request-panel-header">
        <PageHeader title="REQUESTS" actionBtn="New Request" openModal={openModal} />
        {
          requestsLength > 0 && (
            <div className="open-requests">
              {this.renderButtonGroup()}
              <HeaderPagination getRequestsWithLimit={getRequestsWithLimit} url={url} />
            </div>
          )}
      </div>
    );
  }
}

RequestPanelHeader.propTypes = {
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  url: PropTypes.string.isRequired,
  activeStatus: PropTypes.string,
  getRequestsWithLimit: PropTypes.func.isRequired,
  fetchRequests: PropTypes.func.isRequired,
  requestsLength: PropTypes.number,
  openModal: PropTypes.func,
};

RequestPanelHeader.defaultProps = {
  openRequestsCount: null,
  pastRequestsCount: null,
  requestsLength: null,
  activeStatus: 'all',
  openModal: null,
};

export default RequestPanelHeader;
