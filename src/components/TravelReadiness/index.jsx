import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import download from '../../images/icons/save_alt_24px.svg';
import Button from '../buttons/Buttons';
import TravelReadinessPlaceholder from '../Placeholders/TravelReadinessPlaceholder';
import './TravelReadiness.scss';

class TravelReadiness extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  };

  getReadinessCSV = () => {
    const { exportReadiness } = this.props;
    const { travelFlow } = this.state;
    exportReadiness({ type: 'file', travelFlow: travelFlow});
  };

  getTravelFlow = travelArgument => {
    const { fetchReadiness } = this.props;
    this.setState({
      travelFlow: travelArgument
    });
    fetchReadiness({page: '1', limit: '6', type:'json', travelFlow: travelArgument});
  };

  travelFlowButton = () => {
    const { travelFlow } = this.state;
    const travelButton = (
      <Fragment>
        <button
          className="travel-readiness-toggle-button-0" type="button"
          id={travelFlow !== 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('inflow')}>
        Inflow
        </button>
        <button
          className="travel-readiness-toggle-button-1" type="button"
          id={travelFlow === 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('outflow')}>
        Ouflow
        </button>
      </Fragment>
    );
    return travelButton;
  };

  render() {
    const { readiness, renderNotFound } = this.props;
    const { isLoading} = readiness;
    const { travelFlow } = this.state;
    return (
      <div className="analyticsReport__card" id="travel-readiness" style={{marginRight: '30px'}}>
        { isLoading ?
          <TravelReadinessPlaceholder /> : (
            <Fragment>
              <p>Travel Readiness</p>
              <div className="analyticsReport__row analyticsReport__header">
                {this.travelFlowButton()}
                <Button
                  buttonClass="analyticsReport__export-button"
                  reverseText buttonId="btnExportReadinessCSV"
                  text="Export" imageSrc={download}
                  onClick={travelFlow === 'outflow' ? () => this.getReadinessCSV('outflow') : () => this.getReadinessCSV('inflow')} />
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
              {readiness.readiness && readiness.readiness.length > 0 && !readiness.isLoading &&
            readiness.readiness.map((item, index) => this.renderReadinessDetails(item, index))}
              {readiness.readiness && !readiness.readiness.length && renderNotFound()}
            </Fragment>
          )}
      </div>
    );
  }
}
TravelReadiness.propTypes = {
  readiness: PropTypes.object.isRequired,
  exportReadiness:PropTypes.func.isRequired,
  fetchReadiness: PropTypes.func.isRequired,
  renderNotFound: PropTypes.func.isRequired
};

export default TravelReadiness;
