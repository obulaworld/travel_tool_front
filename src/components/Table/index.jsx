import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RequestsModal from '../RequestsModal/RequestsModal';
import Modal from '../modal/Modal';
import './Table.scss';
import withLoading from '../Hoc/withLoading';

export class Table extends Component {
  state = {
    clickedRequestId: null
  };
  getDuration(trips) {
    const returnDates = trips.map(trip => new Date(trip.returnDate));
    const departureDates = trips.map(trip => new Date(trip.departureDate));
    const minDeparture = Math.min.apply(null, departureDates);
    const maxReturn = Math.max.apply(null, returnDates);
    const duration = Math.abs(
      moment(maxReturn).diff(moment(minDeparture), 'days')
    );
    return `${duration + 1} days`;
  }
  formatTripType = tripType => {
    if (tripType === 'oneWay') {
      return 'One-way';
    }
    return tripType
      .charAt(0)
      .toUpperCase()
      .concat(tripType.toLowerCase().slice(1));
  };
  handleClickRequest = requestId => {
    const { openModal, page } = this.props;
    this.setState({
      clickedRequestId: requestId
    });
    openModal(true, 'request details', page);
  };
  renderNoRequests(message) {
    return <div className="table__requests--empty">{message}</div>;
  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderRequestStatus(request) {
    return (
      <div>
        <div
          id={`status-${request.id}`}
          className={
            request.status === 'Open'
              ? 'request__status--open'
              : request.status === 'Rejected'
                ? 'request__status--rejected'
                : 'request__status--approved'
          }
        >
          {request.status}
        </div>
        <span className="table__request-menu">
          <i className="fa fa-ellipsis-v" />
        </span>
      </div>
    );
  }

  renderApprovalsIdCell(request) {
    return (
      <td className="mdl-data-table__cell--non-numeric table__requests__destination table__data freeze">
        <div
          onKeyPress={() => {}}
          onClick={() => this.handleClickRequest(request.id)}
          role="button"
          tabIndex="0"
          className="button-outline"
        >
          {request.id}
        </div>
      </td>
    );
  }

  renderRequest(request, type) {
    const { trips } = request;
    const tripTypeFormatted = this.formatTripType(request.tripType);
    const travelDuration =
      request.tripType !== 'oneWay'
        ? this.getDuration(trips)
        : 'Not applicable';
    return (
      <tr key={request.id} className="table__row">
        {this.renderApprovalsIdCell(request)}
        {type === 'approvals' && (
          <td className="mdl-data-table__cell--non-numeric table__data pl-sm-100">
            {request.name}
          </td>
        )}
        <td
          className={`mdl-data-table__cell--non-numeric table__data ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          {tripTypeFormatted}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {trips[0].origin}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {travelDuration}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {moment(request.departureDate).format('DD MMM YYYY')}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data">
          {this.renderRequestStatus(request)}
        </td>
      </tr>
    );
  }

  renderTableHead(type) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze">
          Request ID
        </th>
        {type === 'approvals' && (
          <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100">
            Owner
          </th>
        )}
        <th
          className={`mdl-data-table__cell--non-numeric table__head ${
            type === 'requests' ? 'pl-sm-100' : ''
          }`}
        >
          Trip Type
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Origin
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Duration
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Start Date
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Status
        </th>
      </tr>
    );
  }

  renderDetailsModal() {
    const { clickedRequestId } = this.state;
    const { closeModal, shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        width="710px"
        modalId="request-details-modal"
        modalContentId="request-details-modal-content"
        visibility={
          shouldOpen && modalType === 'request details'
            ? 'visible'
            : 'invisible'
        }
        title={`#${clickedRequestId} Request Details`}
        modalBar={<div className="table__modal-bar-text">Manager stage</div>}
      >
        <RequestsModal requestId={clickedRequestId} />
      </Modal>
    );
  }

  render() {
    const { requests, type, fetchRequestsError, message } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          {fetchRequestsError && this.renderError(fetchRequestsError)}
          {requests &&
            requests.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__requests">
              <thead>{this.renderTableHead(type)}</thead>
              <tbody className="table__body">
                {requests.map(request => this.renderRequest(request, type))}
              </tbody>
            </table>
          )}
          {!fetchRequestsError &&
            !requests.length &&
            this.renderNoRequests(message)}
          {this.renderDetailsModal()}
        </div>
      </Fragment>
    );
  }
}

const editRequest = PropTypes.func;
Table.propTypes = {
  requests: PropTypes.array,
  type: PropTypes.string,
  fetchRequestsError: PropTypes.string,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  message: PropTypes.string,
  page: PropTypes.string
};

Table.defaultProps = {
  type: 'requests',
  fetchRequestsError: null,
  requests: [],
  closeModal: () => {},
  openModal: () => {},
  shouldOpen: false,
  modalType: null,
  message: '',
  page: ''
};

export default withLoading(Table);
