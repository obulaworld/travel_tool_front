import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WithLoadingTable from '../../components/Table';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/CheckInTable';
import Utils from '../../helper/Utils';
import Base from '../Base';
import {
  fetchTrips,
  updateTrip
} from '../../redux/actionCreator/tripActions';

export class CheckIn extends Base {

  constructor (props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips();
  }

  handleCheckStatus = (tripId, checkType) => {
    const { updateTrip } = this.props;
    const tripData = {
      checkType
    };
    updateTrip({tripId, tripData});
  }
  render() {
    const { trips, tripError } = this.props;
    return (
      <Fragment>
        <div>
          <PageHeader title="RESIDENCE" />
          <Table
            trips={trips.filter((trip) => trip.checkStatus !== 'Checked Out')}
            tripError={tripError}
            handleCheckStatus={this.handleCheckStatus} />
        </div>
        <div>
          <PageHeader
            title="Past Check-in's"
            titleClassName="past_checkin_header"
          />
          <Table
            trips={trips.filter((trip) => trip.checkStatus === 'Checked Out')}
            handleCheckStatus={this.handleCheckStatus} />
        </div>
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ trips }) => ({
  ...trips
});

const actionCreators = {
  fetchTrips,
  updateTrip
};

export default connect(
  mapStateToProps,
  actionCreators
)(CheckIn);
