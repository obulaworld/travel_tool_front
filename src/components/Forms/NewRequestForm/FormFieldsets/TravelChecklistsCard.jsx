import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Preloader from '../../../Preloader/Preloader';
import travelChecklistHelper from '../../../../helper/request/RequestUtils';

class TravelChecklistsCard extends Component {
  componentDidMount() {
    const { fetchTravelChecklist, trips } = this.props;
    const tripDestinations = {};
    trips.map(trip => {
      tripDestinations[trip.destination.split(',', 1)] = trip.destination;
    });
    fetchTravelChecklist(null, Object.keys(tripDestinations));
  }
  displayTravelChecklist(checklistItems) {
    return (
      <li className="approval-item" key={checklistItems.id}> 
        <div className="oval" />
        <div className="checklist-name">{checklistItems.name}</div>
      </li>
    );
  }

  render() {
    const { checklistItems, isLoading, userData } = this.props;
    let finalCheckLists = travelChecklistHelper.cleanChecklists(checklistItems, userData);
  
    finalCheckLists = finalCheckLists.reduce((accumulator, checklist) => {
      if(!accumulator.ids.includes(checklist.id)) {
        accumulator.ids.push(checklist.id);
        accumulator.checklist.push(checklist);
      }
      return accumulator;
    }, {ids: [], checklist: []}).checklist;
    return (
      <div>
        <div className="travel-checklist-rectangle">
          <div className="travel-checklist-text">
            <p> Travel Checklist Required For This Trip</p> 
          </div>
          <hr className="travel-checklist-line" />        
          {isLoading
            ? <Preloader /> :  (
              <div className="pending-approvals-block">
                <ul className="approval-list-items">
                  { finalCheckLists && finalCheckLists.map(checklist => {
                    return this.displayTravelChecklist((checklist));
                  })}
                </ul>
              </div>
            )}
        </div>
      </div>
    );
  }
}
TravelChecklistsCard.propTypes = {
  checklistItems: PropTypes.array,
  fetchTravelChecklist: PropTypes.func,
  trips: PropTypes.array,
  isLoading: PropTypes.bool,
  userData: PropTypes.object
};
TravelChecklistsCard.defaultProps = {
  checklistItems: [],
  fetchTravelChecklist: () => {},
  isLoading: false,
  trips: [{}],
  userData: {}
};
export default TravelChecklistsCard;
