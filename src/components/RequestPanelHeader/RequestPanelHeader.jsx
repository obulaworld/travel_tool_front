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
      fetchUserRequests,
      pastRequestsCount,
      limit
    } = this.props;
    return (
      <ButtonGroup
        openRequestsCount={openRequestsCount}
        fetchUserRequests={fetchUserRequests}
        pastRequestsCount={pastRequestsCount}
        limit={limit}
        buttonsType="requests"
      />
    );
  };

  render() {
    const { requests, getRequestsWithLimit, toggleNewRequestModal } = this.props;
    return (
      <div className="request-panel-header">
        <PageHeader title="REQUESTS" actionBtn="New Request" toggleNewRequestModal={toggleNewRequestModal} />
        {requests &&
          requests.length > 0 && (
          <div className="open-requests">
            {this.renderButtonGroup()}
            <HeaderPagination
              getRequestsWithLimit={getRequestsWithLimit}
            />
          </div>
        )}
      </div>
    );
  }
}

RequestPanelHeader.propTypes = {
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  limit: PropTypes.number.isRequired,
  getRequestsWithLimit: PropTypes.func.isRequired,
  fetchUserRequests: PropTypes.func.isRequired,
  requests: PropTypes.array,
  toggleNewRequestModal: PropTypes.func.isRequired,
};

RequestPanelHeader.defaultProps = {
  openRequestsCount: null,
  pastRequestsCount: null,
  requests: null,
};

export default RequestPanelHeader;
