
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TravelLink from '../_RequestTravel';
import generateDynamicDate from '../../../helper/generateDynamicDate';

class RequestInfo extends Component {
  render() {
    const { requestData } = this.props;
    const { createdAt, departureDate, arrivalDate } = requestData;
    return (
      <div className="modal__modal-date">
        <TravelLink
          divClass="modal__travel-date" innerClass="modal__travel-dates"
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, createdAt)} />
        <TravelLink
          divClass="modal__travel-date" innerClass="modal__travel-dates"
          dynamicText="Target depature date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, departureDate)} />

        <TravelLink
          divClass="modal__travel-date" innerClass="modal__travel-dates"
          dynamicText="Target return date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, arrivalDate)} />
      </div>
    );
  }
}

RequestInfo.propTypes = {
  requestData: PropTypes.object,
};

RequestInfo.defaultProps = {
  requestData: {},
};

export default RequestInfo;
