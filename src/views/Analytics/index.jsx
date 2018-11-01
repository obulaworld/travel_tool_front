import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { fetchAnalytics } from '../../redux/actionCreator/analyticsActions';
import flightTakeoff from '../../images/icons/flight_takeoff.svg';
import pencdingIcon from '../../images/icons/pending_icon.svg';
import flightLand from '../../images/icons/flight_land.svg';
import AnalyticsCard from '../../components/AnalyticsCard';
import flightIcon from '../../images/icons/flight.svg';
import './index.scss';

export class Analytics extends Component {
  city = 'Nairobi';
  componentDidMount() {
    const { fetchAnalytics, context } = this.props;
    const { start, end } = context.state.range;
    const query =`?dateFrom=${start}&dateTo=${end}`;
    fetchAnalytics(query);
  }

  componentWillReceiveProps(nextProps) {
    const {context, fetchAnalytics} = this.props;
    if(nextProps.context.state.filter !== context.state.filter) {
      const { start, end } = nextProps.context.state.range;
      const query =`?dateFrom=${start}&dateTo=${end}`;
      fetchAnalytics(query);
    }
  }

  render() {
    const { analytics } = this.props;
    const {
      total_requests,
      people_leaving,
      people_visiting,
      pending_requests,
      travel_duration_breakdown,
      travel_lead_time_breakdown
    } = analytics.payload;

    return (
      <div className="analytics">
        <AnalyticsCard stats={total_requests} title="Total No. of Travel Requests" icon={flightIcon} />
        <AnalyticsCard stats={pending_requests} title="Total Number of Pending Requests" icon={pencdingIcon} />
        <AnalyticsCard title="Average Travel Duration" data={analytics.success && travel_duration_breakdown.durations} chart />
        <AnalyticsCard stats={people_leaving} title={`No. of People leaving ${this.city} Center`} icon={flightLand} color="green" />
        <AnalyticsCard
          stats={people_visiting}
          title={`No. of People visiting ${this.city} Center`}
          icon={flightTakeoff}
          color="brown-orange"
        />
        <AnalyticsCard title="Average Travel RequestLead Time" data={analytics.success && travel_lead_time_breakdown.lead_times} chart />
      </div>
    );
  }
}

Analytics.propTypes = {
  fetchAnalytics: PropTypes.func.isRequired,
  analytics: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({
    state: {}
  }).isRequired
};

export const mapStateToProps = ({analytics}) => ({
  analytics
});

const actionCreator = {
  fetchAnalytics
};

export default connect(mapStateToProps, actionCreator)(Analytics);
