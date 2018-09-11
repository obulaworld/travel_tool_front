import React, { Component } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';

class TravelDetailsFieldset extends Component {

  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;
    const { values } = this.props;
    const otherDestStatus = values.destination === 'Other' ? '' : 'hidden';
    const otherDestCustomClass = `full-width other-dest--${otherDestStatus}`;

    const customPropsOtherDest = { className: otherDestCustomClass };
    const customPropsForDepartureDate = { minDate: moment() };
    const customPropsForArrivalDate = {
      disabled: !values.departureDate,
      minDate: moment(values.departureDate),
      placeholderText: !values.departureDate? 'select departure date first' : 'select return date'
    };

    return (
      <fieldset className="travel-details">
        <legend>
          Travel Details
        </legend>
        <div className="input-group">
          {renderInput('origin', 'dropdown-select')}
          {renderInput('destination', 'dropdown-select')}
          {renderInput('otherDestination', 'text', customPropsOtherDest)}
          {renderInput('departureDate', 'date', customPropsForDepartureDate)}
          {renderInput('arrivalDate', 'date', customPropsForArrivalDate)}
        </div>
      </fieldset>
    );
  }
}

TravelDetailsFieldset.propTypes = {
  values: PropTypes.object.isRequired,
};

export default TravelDetailsFieldset;
