import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import ListTravelReasons from '../../components/TravelReasons/ListTravelReasons';
import {fetchAllTravelReasons} from '../../redux/actionCreator/listTravelReasonsActions';


export class TravelReasons extends Component {
  render() {
    const {fetchAllTravelReasonsAction, listTravelReasons, location} = this.props;
    return(
      <Fragment>
        <div className="reasons-header">
          <PageHeader
            title="Travel Reasons"
            actionBtn="Add Reason"
          />
        </div>
        <ListTravelReasons
          listTravelReasons={listTravelReasons}
          fetchAllTravelReasonsAction={fetchAllTravelReasonsAction}
          location={location}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ listTravelReasons }) => ({
  listTravelReasons
});

const mapDispatchToProps = {
  fetchAllTravelReasonsAction: fetchAllTravelReasons
};

TravelReasons.propTypes = {
  fetchAllTravelReasonsAction: PropTypes.func.isRequired,
  listTravelReasons: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelReasons);
