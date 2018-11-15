import React, {Fragment } from 'react';
import PropTypes from 'prop-types';
import {startOfWeek, endOfWeek, format} from 'date-fns';

import Base from '../../views/Base';
import './TravelCalendar.scss';
import Utils from '../../helper/Utils';
import TravelCalendarDetails from '../TravelCalendarDetails';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import CalendarRange from '../CalendarRange';

class TravelCalendar extends Base {
  state = {
    filter:
      `dateFrom=${format(startOfWeek(new Date()), 'YYYY-MM-DD')}&dateTo=${format(endOfWeek(new Date()), 'YYYY-MM-DD')}`,
    isCalendarOpen: false,
    filterBtnLabel: 'This week'
  };

  componentDidMount(){
    const {fetchCalendarAnalytics} = this.props;
    const {filter} = this.state;
    fetchCalendarAnalytics({type: 'json', filter});
  }

  handleChange = (range) => {
    const {fetchCalendarAnalytics} = this.props;
    const query = Utils.manageRangeFilter(range);
    const label = Utils.manageFilterBtnLabel(range);
    if(query !== this.state.filter){
      this.setState(prevState => ({
        ...prevState,
        filter: query,
        filterBtnLabel: label
      }));
      fetchCalendarAnalytics({type:'json', filter:query});
    }
    range.start !== range.end && this.handleCalendar();
  }

  handleCalendar = () => {
    this.setState(prevState=>{
      const {isCalendarOpen} = prevState;
      return {...prevState, isCalendarOpen: !isCalendarOpen};
    });
  }

  getTravelCalendarCSV = () => {
    const {downloadCalendarAnalytics} = this.props;
    const {filter} = this.state;
    downloadCalendarAnalytics({type: 'file', filter});
  }

  renderButton (icon, text, onclickFunction) {
    const {isCalendarOpen, filterBtnLabel} = this.state;
    return (
      <Fragment>
        <button
          type="button"
          className={text==='Pick a date'?'action-btn--calender':'actions__btn'}
          onClick={onclickFunction}>
          <Fragment>
            {text==='Pick a date' && !isCalendarOpen && (<div className="filterLabel">{filterBtnLabel}</div>)}
            <img className="actions__btn--icon" src={icon} alt={text} />
          </Fragment>
        </button>
        {text==='Pick a date' && (
          <div className={`calendar ${isCalendarOpen ? 'open': ''}`}>
            <CalendarRange handleChange={this.handleChange} />
          </div>
        )}
      </Fragment>
    );
  }

  renderSpinner () {
    return (
      <div className="analyticsReport__report-details">
        <br />
        <div className="analyticsReport__spinner" />
        <p className="analyticsReport__text-center">generating report...</p>
      </div>
    );
  }

  renderTravelCalendarDetails () {
    const {travelCalendar:{travelCalendarData, travelCalendarError}} = this.props;
    let calendarData;
    if(travelCalendarData.data.length){
      const data = travelCalendarData.data;
      calendarData = data.map(calender => (
        <Fragment key={calender.name}>
          <TravelCalendarDetails calendar={calender} />
        </Fragment>
      ));
    }else if(travelCalendarError){
      return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp errorMsg">
          <p className="errorMsg__text">Records Not Found</p>
        </div>
      );
    }
    return calendarData;
  }

  renderCalendarHeader () {
    return (
      <div className="calendar-header">
        <p className="title">Travel Calendar</p>
        <div className="actions">
          {this.renderButton(activeCalendar, 'Pick a date', this.handleCalendar)}
          {this.renderButton(download, 'Export', this.getTravelCalendarCSV)}
        </div>
      </div>
    );
  }

  render(){
    const {travelCalendar:{isLoading}} = this.props;
    return (
      <Fragment>
        {this.renderCalendarHeader()}
        {isLoading ? this.renderSpinner():(
          <div className="container">
            {this.renderTravelCalendarDetails()}
          </div>
        )}
      </Fragment>
    );
  }
}

TravelCalendar.propTypes = {
  fetchCalendarAnalytics: PropTypes.func.isRequired,
  downloadCalendarAnalytics: PropTypes.func.isRequired,
  travelCalendar: PropTypes.object.isRequired
};

export default TravelCalendar;
