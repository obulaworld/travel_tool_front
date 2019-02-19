import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewTravelStipendFormMetadata';

class TravelStipendFieldset extends Component {

  renderfields = () => {
    const { centers } = this.props;

    const centerChoices = centers.map(center => center.location);
    const { renderInput } = this.inputRenderer;
  
    return (
      <div>
        <div>
          <div className="input-group">
            <div className="spaces">
              {
                renderInput('center', 'dropdown-select', {
                  choices: centerChoices,
                  size: '',
                  className: 'request_dropdown stipend-location',
                  id: 'user-location'
                })
              }
            </div>
            <div className="spaces">
              {renderInput('stipend', 'text', {
                size: '',
                className: 'request_dropdown stipend-amount',
                id: 'your-manager',
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { default: labels } = formMetadata;
    this.inputRenderer = new InputRenderer(labels);

    return (
      <fieldset className="personal-details">
        {this.renderfields()}
      </fieldset>
    );
  }
}


TravelStipendFieldset.propTypes = {
  centers: PropTypes.array,
};

TravelStipendFieldset.defaultProps = {
  centers: [],
};

export default TravelStipendFieldset;
