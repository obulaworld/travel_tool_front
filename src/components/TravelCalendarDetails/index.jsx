import React, {PureComponent, Fragment} from 'react';
import { PropTypes } from 'prop-types';

import './index.scss';

import ImageLink from '../image-link/ImageLink';
import upic from '../../images/upic.svg';
import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import flightTakeoff from '../../images/flightTakeoff.svg';
import flightLand from '../../images/flightLand.svg';

class TravelCalendarDetails extends PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      hideDetails: true,
      hideBtnLabel: 'Show Details'
    };
  }
  renderUserBio= (name, role, department) => {
    const {hideDetails, hideBtnLabel} = this.state;
    return (
      <Fragment>
        <div className="user">
          <ImageLink
            imageSrc={upic}
            altText="Andela Logo"
            imageClass="navbar__mdl-upic"
          />
          <span className="user__bio">
            <p className="user__name">{name}</p>
            <span className="user__role">{role}</span>
            <span className="user__role">, </span>
            <span className="user__role">{department}</span>
          </span>
          <button className="toggle-btn" type="button" onClick={this.handleHideToggle}>
            {hideBtnLabel}
            <img className="toggle-btn__icon" src={hideDetails?downArrow:upArrow} alt="show/hide details" />
          </button>
        </div>
      </Fragment>
    );
  }

  renderFlightDetails=(flightType, flightDetails)=>{
    const headerAttrs = ['Airline', 'Flight No.', 'Arrival Time', 'Destination'];
    const dataAttrs = ['airline', 'flight_no', 'arrival_time', 'destination'];
    const{hideDetails} = this.state;
    const icon = flightType==='Arrival'?flightLand: flightTakeoff;

    if(!hideDetails){return(
      <Fragment>
        <div className="flight">
          <div className="flight__header">
            <img src={icon} alt="Arrival" />
            <p className="flight__title">{flightType}</p>
          </div>
          <table>
            {headerAttrs.map(attr => (<th key={attr}>{attr}</th>))}
            <tr>
              {dataAttrs.map(attr => (<td key={attr}>{flightDetails[attr]}</td>))}
            </tr>
          </table>
        </div>
      </Fragment>
    );}
  }

  renderTravelCalendarDetails= () => {
    const {calendar} = this.props;
    if(calendar){
      const {flights, name, role, department} = calendar;
      const {arrival, depature} = flights;

      return (
        <Fragment>
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            {this.renderUserBio(name, role, department)}
            <div className="flight-details">
              {this.renderFlightDetails('Arrival', arrival)}
              {this.renderFlightDetails('Departure', depature)}
            </div>
          </div>
        </Fragment>
      );
    }
  }

  handleHideToggle = () => {
    const {hideDetails} = this.state;
    hideDetails ? this.setState({ hideDetails: false, hideBtnLabel:'Hide Details'})
      : this.setState({ hideDetails: true, hideBtnLabel:'Show Details'});
  }

  render(){
    return (
      <Fragment>
        <div>
          {this.renderTravelCalendarDetails()}
        </div>
      </Fragment>
    );
  }
}

TravelCalendarDetails.propTypes = {
  calendar: PropTypes.object.isRequired
};

export default TravelCalendarDetails;
