import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RequestsModal from '../RequestsModal/RequestsModal';
import { CheckListSubmissionForm } from '../Forms';
import { travelChecklists } from '../TravelCheckList/travelChecklistMockData';
import Modal from '../modal/Modal';
import './Table.scss';
import withLoading from '../Hoc/withLoading';
import TableMenu from '../TableMenu/TableMenu';
import TravelChecklist from '../TravelCheckList';

export class Table extends Component {
  state = {
    menuOpen: {
      open: false,
      id: null
    }
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
  toggleMenu = requestId => {
    const { menuOpen } = this.state;
    if (menuOpen.id !== requestId) {
      return this.setState({
        menuOpen: {
          open: true,
          id: requestId
        }
      });
    }
    this.setState({
      menuOpen: {
        open: !menuOpen.open,
        id: requestId
      }
    });
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
    const {
      history,
      location: { pathname }
    } = this.props;
    history.push(`${pathname}/${requestId}`);
  };

  fetchChecklistData(destination){
    // handles fetched trip details. Awaiting endpoint
    return travelChecklists;
  }

  fetchRequestChecklist(trips){
    const destinations=trips.map(trip=>{return this.fetchChecklistData(trip.destination);});
    return destinations;
  }

  renderNoRequests(message) {
    return <div className="table__requests--empty">{message}</div>;
  }

  renderError(error) {
    return <div className="table__requests--error">{error}</div>;
  }

  renderRequestStatus(request) {
    const { editRequest, type, showTravelChecklist,
      fetchTravelChecklist, uploadTripSubmissions } = this.props;

    const { menuOpen } = this.state;
    return (
      <div>
        <div className="table__menu">
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
          <TableMenu
            fetchTravelChecklist={fetchTravelChecklist}
            editRequest={editRequest}
            showTravelChecklist={showTravelChecklist}
            uploadTripSubmissions={uploadTripSubmissions}
            requestStatus={request.status}
            type={type}
            menuOpen={menuOpen}
            request={request}
            toggleMenu={this.toggleMenu}
          />
        </div>
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
    const { trips, travelCompletion } = request;
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
          {trips.length > 0 && trips[0].origin}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {travelDuration}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {moment(request.departureDate).format('DD MMM YYYY')}
        </td>
        { type === 'requests' && (
          <td className="mdl-data-table__cell--non-numeric table__data">
            {travelCompletion || '0% complete'}
          </td>
        )}
        <td className="mdl-data-table__cell--non-numeric table__requests__status table__data">
          {this.renderRequestStatus(request)}
        </td>
        {this.renderUploadSubmissions(request)}
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
          Date Created
        </th>
        { type === 'requests' && (
          <th className="mdl-data-table__cell--non-numeric table__head">
            Travel checklist
          </th>
        )}
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last">
          Status
        </th>
      </tr>
    );
  }

  renderDetailsModal() {
    const { closeModal, shouldOpen, modalType, requestId, page, requestData } = this.props;
    return (
      <Modal
        requestId={requestId}
        closeModal={closeModal}
        width="900px"
        modalId="request-details-modal"
        modalContentId="request-details-modal-content"
        visibility={
          shouldOpen && modalType === 'request details'
            ? 'visible'
            : 'invisible'
        }
        title={`#${requestId} Request Details`}
        modalBar={
          <div className="table__modal-bar-text">{(requestData.status === 'Approved') ? 'Travel stage' : 'Manager Stage'}</div>
        }
      >
        <RequestsModal navigatedPage={page} requestId={requestId} />
      </Modal>
    );
  }

  renderTravelCheckListModal() {
    const { closeModal, shouldOpen, modalType, travelChecklists } = this.props;
    const { menuOpen: { id } } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="600px"
        modalId="travel-checkList-modal"
        modalContentId="travel-checkList-modal-content"
        visibility={
          shouldOpen && modalType === 'travel checklist'
            ? 'visible'
            : 'invisible'
        }
        title="Travel Checklist"
        modalBar={(<div className="table__modal-bar-text">{id}</div>)}
      >
        <TravelChecklist travelChecklists={travelChecklists} />
      </Modal>
    );
  }

  renderUploadSubmissions(requestData) {
    const { closeModal, postSubmission, submissionInfo, requests, isLoading,
      shouldOpen, modalType, travelChecklists, fetchSubmission, isFetching } = this.props;
    const { menuOpen: { id } } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        width="607px"
        customModalStyles="custom-overlay"
        modalId="checklist-submission-modal"
        modalContentId="checklist-submission-modal-content"
        visibility={shouldOpen && modalType === 'upload submissions'?'visible':'invisible'}
        title={modalType === 'upload submissions' ? 'Travel Checklist' : ''}
        modalBar={<div className="table__modal-bar-text">{id}</div>}
      >
        <CheckListSubmissionForm
          requestId={id}
          requestData={requestData}
          checklistsData={travelChecklists}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          postSubmission={postSubmission}
          fetchSubmission={fetchSubmission}
          submissionInfo={submissionInfo}
          requests={requests}
          isLoading={isFetching}
          isFetching={isFetching}
        />
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
          {this.renderTravelCheckListModal()}
        </div>
      </Fragment>
    );
  }
}

Table.propTypes = {
  requests: PropTypes.array,
  type: PropTypes.string,
  fetchRequestsError: PropTypes.string,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  requestId: PropTypes.string,
  requestData: PropTypes.object,
  message: PropTypes.string,
  page: PropTypes.string,
  editRequest: PropTypes.func.isRequired,
  travelChecklists: PropTypes.array.isRequired,
  showTravelChecklist: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  uploadTripSubmissions: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  submissionInfo: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

Table.defaultProps = {
  type: 'requests',
  fetchRequestsError: null,
  requests: [],
  closeModal: () => {},
  shouldOpen: false,
  modalType: null,
  message: '',
  page: '',
  requestId: '',
  requestData: {}
};

export default withLoading(Table);
