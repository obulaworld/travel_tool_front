import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../helper/Utils';
import Button from '../buttons/Buttons';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  filterRequests = (query) => {
    const { fetchRequests, url } = this.props;
    const limit = Utils.getCurrentLimit(url);
    const queryString = limit === '' ?
      '?page=1' : `?page=1&limit=${limit}`;
    fetchRequests(`${queryString}${query}`);
  }

  renderApprovalsButton () {
    return (
      <Fragment>
        <Button
          buttonClass="bg-btn bg-btn--active"
          text="All"
        />
        <Button
          buttonClass="bg-btn bg-btn--with-badge"
          text="Pending Approvals"
          responsiveText="Open"
          badge={3}
          showBadge
          badgeClass="bg-btn--with-badge__approvals--inactive"
        />
        <Button
          buttonClass="bg-btn"
          responsiveText="Past"
          text="Past Approvals"
        />
      </Fragment>
    );
  }

  renderRequestsButton (openRequestsCount, pastRequestsCount) {
    const { activeStatus } = this.props;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${activeStatus === 'all' ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.filterRequests('')}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${activeStatus === 'open' ? 'bg-btn--active' : ''}`}
          text="Open Requests"
          responsiveText="Open"
          buttonId="open-button"
          disabled={openRequestsCount === 0}
          badge={openRequestsCount}
          showBadge={openRequestsCount > 0}
          badgeClass={activeStatus === 'open' ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge--inactive'}
          onClick={() => this.filterRequests('&status=open')}
        />
        <Button
          buttonClass={`bg-btn ${activeStatus === 'past' ? 'bg-btn--active' : ''}`}
          disabled={pastRequestsCount === 0}
          text="Past Requests"
          responsiveText="Past"
          buttonId="past-button"
          onClick={() => this.filterRequests('&status=past')}
        />
      </Fragment>
    );
  }

  render() {
    const { buttonsType, openRequestsCount, pastRequestsCount } = this.props;
    return (
      <div className="button-group">
        { buttonsType === 'approvals' && this.renderApprovalsButton()}
        { buttonsType === 'requests' &&
          this.renderRequestsButton(openRequestsCount, pastRequestsCount) }
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  openRequestsCount: PropTypes.number,
  pastRequestsCount: PropTypes.number,
  fetchRequests: PropTypes.func,
  url: PropTypes.string,
  buttonsType: PropTypes.string.isRequired,
  activeStatus: PropTypes.string,
};

ButtonGroup.defaultProps = {
  openRequestsCount: null,
  pastRequestsCount: null,
  fetchRequests: null,
  url: '',
  activeStatus: 'all'
};


export default ButtonGroup;
