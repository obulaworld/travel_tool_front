import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Base from '../Base';
import DashboardHeader from '../../components/DashboardHeader';
import checkUserPermission from '../../helper/permissions';

export class Dashboard extends Base {
  constructor(props) {
    super(props);
    const { history, getCurrentUserRole } = this.props;
    const allowedRoles = ['Travel Administrator', 'Super Administrator'];
    checkUserPermission(history, allowedRoles, getCurrentUserRole);
  }

  render() {
    return (
      <DashboardHeader />
    );
  }
}

export const mapStateToProps = ({user}) => ({
  getCurrentUserRole: user.getCurrentUserRole,
});

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  getCurrentUserRole: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
