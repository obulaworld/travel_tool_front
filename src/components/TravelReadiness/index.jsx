 
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import download from '../../images/icons/save_alt_24px.svg';

export class TravelReadiness extends Component {
  constructor(props) {
    super(props);
  }
renderReadinessDetails = (item) => {
  return (
    <div className="analyticsReport__row analyticsReport__report-details">
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
    const { fetchReadiness } = this.props;
    fetchReadiness({ page: '1', limit:'6', type: 'file', });
    fetchReadiness({ page: '1', limit:'6', type: 'json', });
  }
  
  render() {
    const { readiness, renderNotFound, renderButton, renderSpinner } = this.props;
    const { isLoading} = readiness;
    return (
      <div className="analyticsReport__card" style={{marginRight: '30px'}}>
        <div className="analyticsReport__row analyticsReport__header">
          Travel Readiness
          {renderButton('btnExportReadinessCSV', download, 'Export', this.getReadinessCSV)}
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
            readiness.readiness.map(item => this.renderReadinessDetails(item))}
        {readiness.readiness && !readiness.readiness.length &&
            renderNotFound()
        }
      </div>
    );
  }
}
TravelReadiness.propTypes = {
  readiness: PropTypes.object.isRequired,
  fetchReadiness:PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  renderNotFound: PropTypes.func.isRequired,
  renderSpinner: PropTypes.func.isRequired
};

export default TravelReadiness;

