import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import countryUtils from '../../helper/countryUtils';
import check from '../../images/check.svg';
import './travelSubmission.scss';
import WithLoadingSubmission from './SubmissionFormSets';
import withLoading from '../Hoc/withLoading';

class CheckListSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: null,
    };}

  componentDidMount(){
    const { fetchSubmission, requestId } = this.props;
    fetchSubmission({ requestId });
  }

  componentWillReceiveProps(someProps){
    const { submissionInfo } = someProps;
    const { postSuccess } = submissionInfo;
    if (submissionInfo.submissions.length > 0) {
      let finalSubmission;
      submissionInfo.submissions.forEach((submission)=>{
        if (submission.checklistItemId === 'null') {
          finalSubmission = submission;
        }
      });
    }
    if (postSuccess !== '') {
      setTimeout(() => {
        this.setState({ uploadSuccess: null });}, 2000);
    }
  }

  handleSubmitTicket = (data, tripId ) => {
    const { postSubmission } = this.props;
    const formData = {
      file: null,
      submissionId: null,
      tripId,
      isUpload: false,
      data,
      label: 'AirTicket'
    };
    const finalData = {
      formData, checklistId: null
    };
    setTimeout(() => {
      this.setState({uploadSuccess: 'start'});
      postSubmission(finalData);}, 2000);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    const tripType = e.target.id.split(' ')[1];
    const ticketFields = {
      oneWay: [ 'airline', 'arrivalTime', 'ticket' ],
      return: [
        'returnAirline', 'airline', 
        'returnFlightNumber', 'arrivalTime',
        'returnArrivalTime', 'ticket' ]
    };
    const listOf = tripType !== 'return' ? ticketFields['oneWay']:undefined;
    const returnTripField = tripType === 'return' ? ticketFields[tripType] : undefined;
    let objState = this.state;
    let newL = Object.keys(objState);
    let count = 0;
    let countReturn = 0;
    if (listOf) {
      listOf.forEach(
        item => {
          if (newL.includes(item)) {count++;}
        }
      );
    }
    if (returnTripField){
      returnTripField .forEach(
        item => {
          if (newL.includes(item)) {countReturn++;}
        }
      );
    }

    const tripId = e.target.className;
    if (count === 3) {
      const { airline, ticket, arrivalTime } = this.state;
      const data = {
        'airline': airline,
        'flightNumber': ticket,
        'arrivalTime': arrivalTime,
      };
      this.handleSubmitTicket(data, tripId);
    } else { count = 0; }

    if (countReturn === 6) {
      const { 
        returnFlightNumber,
        returnAirline, airline, ticket, arrivalTime,
        returnArrivalTime } = this.state;

      const data = {
        'airline': airline,
        'flightNumber': ticket,
        'arrivalTime': arrivalTime,
        'returnFlightNumber': returnFlightNumber,
        'returnAirline': returnAirline,
        'returnArrivalTime': returnArrivalTime
      };

      this.handleSubmitTicket(data, tripId);
    }else{ countReturn = 0; }
    
  }

  findTripId = (data) => {
    const { destination, trips } = data;
    let newTrip;
    if (trips) {trips.forEach((trip) => {
      if (trip.destination === destination) {
        newTrip = trip;
      }
    });
    return newTrip;}
  }

  findSubmission = (submissions, data) => {
    let finalSubmission;
    const trip = this.findTripId(data);
    const tripId = trip ? trip.id : null;
    if(submissions !== ''){
      submissions.forEach(
        submission => {
          const itemId = 'null';
          const checklistId = submission.checklistItemId;
          const checklistripId = submission.tripId;
          if (itemId === checklistId && checklistripId === tripId)
          {finalSubmission=submission;}
        }
      );}
    return finalSubmission;
  }

  renderTicketInput= (type, placeholder, label, name, id, data, tripType, pattern) =>{
    const holder = placeholder || '';
    const tripId = this.findTripId(data).id;
    pattern = pattern || null; 
    return (
      <div className="airline-name">
        <label htmlFor={id}>
          <span id="label">{label}</span>
          <input
            id={`airline-name ${tripType}`} type={type} onChange={this.handleChange} 
            name={name} placeholder={holder}
            className={tripId} readOnly={false} pattern={pattern} />
        </label>
      </div>
    );
  }

  renderTicketFieldset = (data) => {
    const { submissionInfo, requestId, requests } = this.props;
    const { uploadSuccess, uploadPresent } = this.state;
    const submission = this.findSubmission(submissionInfo.submissions, data);
    let airline, ticket, arrivalTime, tripType, fields, returnTrip,
      value, visible, returnAirline, returnFlightNumber, returnArrivalTime;
    const link = 'https://github.com/\
    yannickcr/eslint-plugin-react/tree/master/docs/rules/jsx-key.md';
    const id = requestId;
    const pattern = '([01]?[0-9]|2[0-3]):[0-5][0-9]';
    if (requests) {
      requests.forEach(request => {
        if (request.id === requestId){
          tripType = request.tripType;
        }
      });
    }
    if (submission) {
      value = JSON.parse(submission.value);
      airline = value.airline || '  e.g Kenya Airways';
      ticket = value.flightNumber || '  e.g KG 435K';
      arrivalTime = value.arrivalTime || '10:00';
      returnAirline = value.returnAirline || '  e.g Kenya Airways';
      returnFlightNumber = value.returnFlightNumber || '  e.g KG 435K';
      returnArrivalTime = value.returnArrivalTime || '10:00';
    } else {
      airline = '  e.g Kenya Airways';
      ticket = '  e.g KG 435K';
      arrivalTime = '10:00';
      returnAirline = '  e.g Kenya Airways';
      returnFlightNumber = '  e.g KG 435K';
      returnArrivalTime = '10:00';
    }
    if (tripType === 'return') {
      fields = 'travel-submission-fields';
      returnTrip = '__return';
    }
    fields = fields ? 'travel-submission-fields' : '';
    returnTrip = returnTrip ? '__return' : ''; 
    visible = value === undefined ? '__hidden' : '';
    return (
      <div className="travelCheckList--item__item">
        <div className="travelCheckList--item__input-label">
          <span className="travelCheckList--item__visa-application">
          Travel Ticket Details
          </span>
          <a
            key={id}
            href={link}
            className="travelCheckList--item__visa-application-gu__ticket"
          >
              (Flight application guide)
          </a>
        </div>
        <form className="ticket-submission" onSubmit={this.handleSubmit}>
          <div className={`${fields}`}>
            <div className={`travel-submission-details${returnTrip}`} id="departure-fields">
              {this.renderTicketInput('text', airline, 'Airline', 'airline', id, data, tripType)}
              {this.renderTicketInput('text', ticket, 'Ticket Number', 'ticket', id, data, tripType)}
              {this.renderTicketInput('text', arrivalTime, 'Arrival Time', 'arrivalTime', id, data,
                tripType, pattern)}
              <img src={check} alt="check_icon" className={`travelCheckList--input__check-image__ticket${visible}`} />
            </div>
            {tripType === 'return' ? (
              <div className="travel-submission-details__return" id="return-fields">
                {this.renderTicketInput('text', returnAirline, 'Return Airline',
                  'returnAirline', id, data, tripType)}
                {this.renderTicketInput('text', returnFlightNumber, 'Return Ticket Number',
                  'returnFlightNumber', id, data, tripType)}
                {this.renderTicketInput('text', returnArrivalTime, 'Return Arrival Time',
                  'returnArrivalTime', id, data, tripType, pattern)}
              </div>):null}
          </div>
          {uploadPresent ? (<img src={check} alt="check_icon" className="travelCheckList--input__check-image__ticket" />) : null}
          {uploadSuccess === 'start' ? (<div id="progress-bar__ticket">Uploading content... </div>) : null}
        </form>
      </div>
    );
  }

  renderCheckListITems = (destination) => {
    const { requestData, requests, isLoading,
      postSubmission, submissionInfo, requestId } = this.props;
    let trips;
    if (requests) {
      requests.forEach(request => {
        if (request.id === requestId){
          trips = request.trips;
        }
      });
    }
    const data = {trips, destination: destination.destination};
    const checklist = destination.checklist;
    return (
      <div>
        <div className="travelCheckList--item__list-items">
          {
            checklist.length > 0 &&
            checklist.map((item) => {
              const { resources, } = item;
              let { label, } = resources[0] || false;
              label = label ? `(${label})` : '';
              return (
                <WithLoadingSubmission
                  requestData={requestData}
                  requestId={requestId}
                  submissionInfo={submissionInfo}
                  destination={destination.destination}
                  trips={trips}
                  postSubmission={postSubmission}
                  handleDownLoad={this.handleDownLoad}
                  handleUpload={this.handleUpload}
                  item={item} key={item.id}
                  isLoading={isLoading} />
              );}
            )
          }
          {this.renderTicketFieldset(data)}
        </div>
      </div>
    );
  }
  renderDestinations (destination, index) {
    const countryFlagUrl = countryUtils.getCountryFlagUrl(destination.destination);
    return (
      <div key={index}>
        <div className="travelCheckList__destination">
          <div className="travelCheckList__destination-name">
            <div
              className="travelCheckList__destination-flag" 
              alt="country flag" style={{ backgroundImage: `url(${countryFlagUrl})` }} />
            {destination.destination}
          </div>
          {this.renderCheckListITems(destination)}
        </div>
      </div>);
  }

  renderSubmissionForm = () => {
    const { checklistsData } = this.props;
    return (
      <div>
        {
          checklistsData.map(
            (destination, index) => this
              .renderDestinations(destination, index))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSubmissionForm()}
      </div>
    );
  }
}

CheckListSubmissionForm.propTypes = {
  checklistsData: PropTypes.array.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  requestData: PropTypes.object.isRequired,
  requestId: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  submissionInfo: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default CheckListSubmissionForm;
