import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';

class TravelDetailsFiedset extends Component {

  render() {
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    const { values } = this.props;
    const otherDestStatus = values.destination==='Other' ? '' : 'hidden';
    const otherDestCustomClass = `full-width other-dest--${otherDestStatus}`;

    return (
      <fieldset className="travel-details">
        <legend>
          Travel Details
        </legend>
        <div className="input-group">
          {renderInput('origin', 'dropdown-select')}
          {renderInput('destination', 'dropdown-select')}
          {renderInput('otherDestination', 'text', otherDestCustomClass)}
          {renderInput('departureDate', 'date')}
          {renderInput('returnDate', 'date')}
        </div>
      </fieldset>
    );
  }
}

TravelDetailsFiedset.propTypes = {
  values: PropTypes.object.isRequired,
};

export default TravelDetailsFiedset;
