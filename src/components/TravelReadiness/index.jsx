 
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import download from '../../images/icons/save_alt_24px.svg';
import Button from '../buttons/Buttons';

class TravelReadiness extends Component {
  constructor(props) {
    super(props);
  }
  renderReadinessDetails = (item, index) => {
    return (
      <div className="analyticsReport__row analyticsReport__report-details" key={`item${index}`}> 
        <div>
          <p>{item.request.name}</p>
        </div>
        <div>
          <p>{item.travelReadiness}</p>
        </div>
        <div>
          <p>{generateDynamicDate({}, item.arrivalDate)}</p>
        </div>
      </div>
    );
  }
  getReadinessCSV = () => {
    const { exportReadiness } = this.props;
    exportReadiness({ page: '1', limit:'6', type: 'file', });
  
  }
  
  render() {
    const { readiness, renderNotFound, renderButton, renderSpinner } = this.props;
    const { isLoading} = readiness;
    return (
      <div className="analyticsReport__card" style={{marginRight: '30px'}}>
        <div className="analyticsReport__row analyticsReport__header">
          <p>Travel Readiness</p>
          <Button
            buttonClass="analyticsReport__export-button"
            reverseText buttonId="btnExportReadinessCSV" 
            text="Export" imageSrc={download} 
            onClick={this.getReadinessCSV} />
        </div>
        <div className="analyticsReport__row analyticsReport__report-header">
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>% Complete</p>
          </div>
          <div>
            <p>Expected Arrival Date</p>
          </div>
        </div>
        {isLoading &&
        renderSpinner()
        }
        {readiness.readiness && readiness.readiness.length > 0 && !readiness.isLoading &&
            readiness.readiness.map((item, index) => this.renderReadinessDetails(item, index))}
        {readiness.readiness && !readiness.readiness.length &&
            renderNotFound()
        }
      </div>
    );
  }
}
TravelReadiness.propTypes = {
  readiness: PropTypes.object.isRequired,
  exportReadiness:PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  renderNotFound: PropTypes.func.isRequired,
  renderSpinner: PropTypes.func.isRequired
};

export default TravelReadiness;

