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
    hideRequestDetailModal: true
  };

  onCloseRequestDetailsModal = () => {
    this.setState({
      hideRequestDetailModal: true
    });
  };

  handleClickRequest = requestId => {
    this.setState({
      clickedRequestId: requestId,
      hideRequestDetailModal: false
    });
  };

  renderUserImage(approval) {
    const image = approval.image;
    if (image === 'none') {
      return (
        <div className="approvals__table__first__cell">
          <p className="approvals__table__text">
            HM
          </p>
        </div>
      );
    } else if (image === 'null') {
      return (
        <div className="approvals__table__second__cell">
          <p className="approvals__table__text">
            JK
          </p>
        </div>
      );
    } else {
      return (
        <img
          src={approval.image}
          alt="user" className="approvals__table__image"
        />
      );
    }
  }

  renderToolTip(approval){
    return(
      <div className="tool__tip">
        {approval.name}
      </div>
    );
  }

  renderNoRequests() {
    return (
      <div className="table__requests--empty">
        You have no requests at the moment
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

  renderUserAvatar(request, avatar){
    if (avatar){
      return (
        <td className="mdl-data-table__cell--non-numeric mdl-cell--hide-phone mdl-cell--hide-tablet table__image">
          {this.renderUserImage(request)}
          {this.renderToolTip(request)}
        </td>
      );
    }
  }

  renderApprovalsIdCell(request, avatar) {
    if (avatar) {
      return (
        <td className="mdl-data-table__cell--non-numeric table__data table__id freeze">
          {request.id}
        </td>
      );
    } else {
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
  }

  renderEmptyCell(avatar){
    if(avatar){
      return(
        <th className="mdl-data-table__cell--non-numeric mdl-cell--hide-tablet table__head freeze" />
      );
    }
  }

  renderRequest(request, avatar) {
    const { arrivalDate, departureDate } = request;
    const travelDuration = Math.abs(moment(arrivalDate).diff(moment(departureDate), 'days'));
    return (
      <tr key={request.id} className="table__row">
        {this.renderUserAvatar(request, avatar)}
        {this.renderApprovalsIdCell(request, avatar)}
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
        {this.renderEmptyCell(avatar)}
        <th className="mdl-data-table__cell--non-numeric table__head freeze">
          Request ID
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
    const { hideRequestDetailModal, clickedRequestId } = this.state;
    return (
      <Modal
        toggleModal={this.onCloseRequestDetailsModal}
        visibility={hideRequestDetailModal ? 'invisible' : 'visible'}
        title={clickedRequestId}
        symbol="#"
        description="Request Details"
        modalBar={(
          <div className="table__modal-bar-text">
            Manager stage
          </div>
        )}
      >
        <RequestDetailsModal handleCreateComment={() => {}} />
      </Modal>

    );}

  render() {
    const { requests, avatar, fetchRequestsError } = this.props;
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
          { !fetchRequestsError && !requests.length && this.renderNoRequests() }
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
};

Table.defaultProps = {
  avatar: '',
  fetchRequestsError: null,
  requests: [],
};

export default withLoading(Table);
