import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from '../modal/Modal';
import RequestDetailsModal from '../RequestsModal/RequestsModal';
import './Table.scss';
import withLoading from '../Hoc/withLoading';

export class Table extends Component {
  state = {
    clickedRequestId: null,
  };

  handleClickRequest = requestId => {
    const { openModal } = this.props;
    this.setState({
      clickedRequestId: requestId,
    });
    openModal(true, 'request details');
  };

  renderNoRequests(message) {
    return (
      <div className="table__requests--empty">
        {message}
      </div>
    );
  }

  renderError(error) {
    return (
      <div className="table__requests--error">
        {error}
      </div>
    );
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
          onKeyPress={() => { }}
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

  renderRequest(request) {
    const { arrivalDate, departureDate } = request;
    const travelDuration = Math.abs(moment(arrivalDate).diff(moment(departureDate), 'days'));
    return (
      <tr key={request.id} className="table__row">
        {this.renderApprovalsIdCell(request)}
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-100">
          {request.name}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.destination}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {request.origin}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {`${travelDuration} days`}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          { moment(request.departureDate).format('DD MMM YYYY')}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data">
          {this.renderRequestStatus(request)}
        </td>
      </tr>
    );
  }

  renderTableHead(avatar) {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze">
          Request ID
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100">
          Owner
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head">
          Destination
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
        visibility={(shouldOpen && modalType === 'request details') ? 'visible' : 'invisible'}
        title={clickedRequestId}
        symbol="#"
        description="Request Details"
        modalBar={(
          <div className="table__modal-bar-text">
            Manager stage
          </div>
        )}
      >
        <RequestDetailsModal handleCreateComment={() => {}} closeModal={closeModal} />
      </Modal>

    );}

  render() {
    const { requests, avatar, fetchRequestsError, message } = this.props;
    return (
      <Fragment>
        <div className="table__container">
          { fetchRequestsError && this.renderError(fetchRequestsError) }
          {
            requests && requests.length > 0 &&
              (
                <table className="mdl-data-table mdl-js-data-table table__requests">
                  <thead>
                    { this.renderTableHead(avatar) }
                  </thead>
                  <tbody className="table__body">
                    { requests.map(request => this.renderRequest(request, avatar)) }
                  </tbody>
                </table>
              )
          }
          { !fetchRequestsError && !requests.length && this.renderNoRequests(message) }
          {this.renderDetailsModal()}
        </div>
      </Fragment>
    );
  }
}

Table.propTypes = {
  requests: PropTypes.array,
  avatar: PropTypes.string,
  fetchRequestsError: PropTypes.string,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  message: PropTypes.string
};

Table.defaultProps = {
  avatar: '',
  fetchRequestsError: null,
  requests: [],
  closeModal: () => {},
  openModal: () => {},
  shouldOpen: false,
  modalType: null,
  message: ''
};

export default withLoading(Table);
