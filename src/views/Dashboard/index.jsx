import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {  fetchDepartmentTrips } from '../../redux/actionCreator/tripAnalyticsActions';
import { fetchAnalytics } from '../../redux/actionCreator/analyticsActions';
import FilterContext, { Consumer } from './DashboardContext/FilterContext';
import AnalyticsReport from '../../components/AnalyticsReport';
import DashboardHeader from '../../components/DashboardHeader';
import checkUserPermission from '../../helper/permissions';
import Analytics from '../../components/Analytics';
import ConnectedAnalytics from '../Analytics';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { history, getCurrentUserRole } = this.props;
    const allowedRoles = ['Travel Administrator', 'Super Administrator'];
    checkUserPermission(history, allowedRoles, getCurrentUserRole);
  }

  render() {
    const { fetchDepartmentTrips, departmentTrips, fetchAnalytics } = this.props;
    return (
      <FilterContext>
        <Consumer>
          {(context) => (
            <Fragment>
              <DashboardHeader downloadCsv={fetchAnalytics} context={context} />
              <ConnectedAnalytics context={context} />
            </Fragment>
          )}
        </Consumer>
        <AnalyticsReport
          fetchDepartmentTrips={fetchDepartmentTrips}
          departmentTrips={departmentTrips}
        />
      </FilterContext>
    );
  }
}

const actions = {
  fetchDepartmentTrips,
  fetchAnalytics
};

export const mapStateToProps = ({user, analytics}) => ({
  getCurrentUserRole: user.getCurrentUserRole,
  departmentTrips: analytics.departmentTrips
});

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  fetchAnalytics: PropTypes.func.isRequired,
  getCurrentUserRole: PropTypes.array.isRequired,
  departmentTrips: PropTypes.shape({}).isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(Dashboard);
