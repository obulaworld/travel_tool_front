import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import PageHeader from '../../components/PageHeader';
import ListTravelStipends from '../../components/TravelStipends/TravelStipends';
import {fetchAllTravelStipends} from '../../redux/actionCreator/travelStipendsActions';

export class TravelStipends extends Component {

  render() {
    const {fetchAllTravelStipends, listAllTravelStipends} = this.props;
    return (
      <Fragment>
        <div>
          <PageHeader
            title="TRAVEL STIPEND"
            actionBtn="Add Stipend"
            actionBtnClickHandler={this.renderCreateTravelStipendModal}
          />
        </div>
        <ListTravelStipends
          listAllTravelStipends={listAllTravelStipends}
          fetchAllTravelStipends={fetchAllTravelStipends}
        />
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ listAllTravelStipends}) => ({
  listAllTravelStipends
});

const actionCreators = {
  fetchAllTravelStipends
};

TravelStipends.propTypes = {
  fetchAllTravelStipends: PropTypes.func.isRequired,
  listAllTravelStipends: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actionCreators)(TravelStipends);
