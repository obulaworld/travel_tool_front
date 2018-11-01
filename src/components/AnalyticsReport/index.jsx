import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import './index.scss';
import errorIcon from '../../images/error_24px.svg';
import download from '../../images/icons/save_alt_24px.svg';

export default class AnalyticsReport extends Component {

  componentDidMount() {
    const { fetchDepartmentTrips } = this.props;
    fetchDepartmentTrips({filterBy: 'month', type: 'json'});
  }

  getDepartmentTripsCSV = () => {
    const { fetchDepartmentTrips } = this.props;
    fetchDepartmentTrips({ filterBy: 'month', type: 'file' });
    fetchDepartmentTrips({ filterBy: 'month', type: 'json' });
  }

  renderButton = (name, icon, text, onclickFunction) => (
    <button
      name={name}
      id={name}
      type="button"
      className="analyticsReport__export-button"
      onClick={onclickFunction}>
      <Fragment>
        {text}
        <img src={icon} alt={text} />
      </Fragment>
    </button>
  );

  renderTripsDetails = (item) => {
    return (
      <div className="analyticsReport__row analyticsReport__report-details">
        <div>
          <p>{item.value}</p>
        </div>
        <div>
          <p>{item.label}</p>
        </div>
      </div>
    );
  }

  renderNotFound = () => {
    return (
      <div id="no-records" className="analyticsReport__report-details">
        <br />
        <p className="analyticsReport__text-center">No records found</p>
      </div>
    );
  }

  renderSpinner = () => {
    return (
      <div className="analyticsReport__report-details">
        <br />
        <div className="analyticsReport__spinner" />
        <p className="analyticsReport__text-center">generating report...</p>
      </div>
    );
  }
  render() {
    const { departmentTrips } = this.props;
    const { report, loading } = departmentTrips;
    return(
      <div className="analyticsReport">
        <div>
          <p>Travel Readiness Report</p>
        </div>
        <div className="analyticsReport__card">
          <div className="analyticsReport__row analyticsReport__header">
            <p>Number of Trips/Month</p>
            {this.renderButton('btnExportTripsPerMonth', download, 'Export', this.getDepartmentTripsCSV)}
          </div>
          <div className="analyticsReport__row analyticsReport__report-header">
            <div>
              <p>Numbers</p>
            </div>
            <div>
              <p>Departments</p>
            </div>
          </div>
          {loading &&
            this.renderSpinner()
          }
          {report && report.length > 0 && !loading &&
            report.map(item => this.renderTripsDetails(item))}
          {report && !report.length &&
            this.renderNotFound()
          }
        </div>
      </div>
    );
  }
}

AnalyticsReport.propTypes = {
  departmentTrips: PropTypes.object.isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired
};
