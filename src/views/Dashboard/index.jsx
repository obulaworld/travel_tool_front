import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  fetchDepartmentTrips } from '../../redux/actionCreator/tripAnalyticsActions';
import { fetchAnalytics } from '../../redux/actionCreator/analyticsActions';
import FilterContext, { Consumer } from './DashboardContext/FilterContext';
import AnalyticsReport from '../../components/AnalyticsReport';
import DashboardHeader from '../../components/DashboardHeader';
import checkUserPermission from '../../helper/permissions';
import { fetchReadiness, exportReadiness } from '../../redux/actionCreator/travelReadinessActions';
import ConnectedAnalytics from '../Analytics';
import TravelCalendar from '../TravelCalendar';

export class Dashboard extends Component {

  render() {
    const { fetchDepartmentTrips, departmentTrips, fetchReadiness,readiness,
      fetchAnalytics, history, getCurrentUserRole, isLoaded, exportReadiness } = this.props;
    if (isLoaded) {
      const allowedRoles = ['Travel Administrator', 'Super Administrator'];
      checkUserPermission(history, allowedRoles, getCurrentUserRole );
    }
    return (
      <Fragment>
        <FilterContext>
          <Consumer>
            {(context) => (
              <Fragment>
                <DashboardHeader downloadCsv={fetchAnalytics} context={context} />
                <ConnectedAnalytics context={context} />
              </Fragment>
            )}
          </Consumer>
        </FilterContext>
        <AnalyticsReport
          fetchDepartmentTrips={fetchDepartmentTrips}
          departmentTrips={departmentTrips}
          fetchReadiness={fetchReadiness}
          exportReadiness={exportReadiness}
          readiness={readiness}
        />
        <TravelCalendar />
      </Fragment>
    );
  }
}

const actions = {
  fetchDepartmentTrips, fetchReadiness, fetchAnalytics, exportReadiness
};

export const mapStateToProps = ({user, analytics, readiness}) => ({
  getCurrentUserRole: user.getCurrentUserRole,
  departmentTrips: analytics.departmentTrips,
  readiness,
  isLoaded: user.isLoaded
});

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  fetchAnalytics: PropTypes.func.isRequired,
  getCurrentUserRole: PropTypes.array.isRequired,
  departmentTrips: PropTypes.shape({}).isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired,
  fetchReadiness: PropTypes.func.isRequired,
  readiness: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  exportReadiness: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(Dashboard);
