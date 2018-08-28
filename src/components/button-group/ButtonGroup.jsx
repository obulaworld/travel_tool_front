import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Buttons';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  defaultState = {
    allActive: false,
    openActive: false,
    pastActive: false,
  }

  state = {
    ...this.defaultState,
    allActive: true,
  };

  fetchRequests = (query, active) => {
    const { fetchUserRequests, limit } = this.props;
    const queryString = `/?page=1&limit=${limit}`;
    this.setState(active);
    fetchUserRequests(`${queryString}${query}`);
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
    const { pastActive, openActive, allActive } = this.state;
    return (
      <Fragment>
        <Button
          buttonClass={`bg-btn ${allActive ? 'bg-btn--active' : ''}`}
          text="All"
          buttonId="all-button"
          onClick={() => this.fetchRequests('', {...this.defaultState, allActive: true })}
        />
        <Button
          buttonClass={`bg-btn bg-btn--with-badge ${ openActive ? 'bg-btn--active' : ''}`}
          text="Open Requests"
          responsiveText="Open"
          buttonId="open-button"
          disabled={openRequestsCount === 0}
          badge={openRequestsCount}
          showBadge={openRequestsCount > 0}
          badgeClass={openActive ? 'bg-btn--with-badge--active' : 'bg-btn--with-badge--inactive'}
          onClick={() => this.fetchRequests('&status=open', {...this.defaultState, openActive: true })}
        />
        <Button
          buttonClass={`bg-btn ${pastActive ? 'bg-btn--active' : ''}`}
          disabled={pastRequestsCount === 0}
          text="Past Requests"
          responsiveText="Past"
          buttonId="past-button"
          onClick={() => this.fetchRequests('&status=past', {...this.defaultState, pastActive: true})}
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
  fetchUserRequests: PropTypes.func,
  limit: PropTypes.number,
  buttonsType: PropTypes.string.isRequired,
};

ButtonGroup.defaultProps = {
  limit: 10,
  openRequestsCount: null,
  pastRequestsCount: null,
  fetchUserRequests: null,
};


export default ButtonGroup;
