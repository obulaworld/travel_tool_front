import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Base from '../Base';
import DashboardHeader from '../../components/DashboardHeader';
import checkUserPermission from '../../helper/permissions';
import Analytics from '../../components/Analytics';
import AnalyticsReport from '../../components/AnalyticsReport';
import {
  fetchDepartmentTrips
} from '../../redux/actionCreator/tripAnalyticsActions';

export class Dashboard extends Base {
  constructor(props) {
    super(props);
    const { history, getCurrentUserRole } = this.props;
    const allowedRoles = ['Travel Administrator', 'Super Administrator'];
    checkUserPermission(history, allowedRoles, getCurrentUserRole);
  }

  render() {
    const { fetchDepartmentTrips, departmentTrips } = this.props;
    return (
      <Fragment>
        <DashboardHeader />
        <Analytics />
        <AnalyticsReport
          fetchDepartmentTrips={fetchDepartmentTrips}
          departmentTrips={departmentTrips}
        />
      </Fragment>
    );
  }
}

const actions = {
  fetchDepartmentTrips
};

export const mapStateToProps = ({user, analytics}) => ({
  getCurrentUserRole: user.getCurrentUserRole,
  departmentTrips: analytics.departmentTrips
});

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  getCurrentUserRole: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, actions)(Dashboard);
