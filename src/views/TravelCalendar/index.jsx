import React, {Fragment } from 'react';
import { connect } from 'react-redux';

import Base from '../Base';
import './TravelCalendar.scss';
import Utils from '../../helper/Utils';
import {fetchCalendarAnalytics} from '../../redux/actionCreator/travelCalendarActions';
import TravelCalendarDetails from '../../components/TravelCalendarDetails';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import TimelineDropdownCalendar from '../../components/TimelineDropdownCalendar';

class TravelCalendar extends Base {
  constructor(props) {
    super(props);
  }

  state = {
    filter: ''
  };

  componentDidMount(){
    const {fetchCalendarAnalytics} = this.props;
    const {filter} = this.state;
    fetchCalendarAnalytics({type: 'json', filter});
  }

  getTravelCalendarCSV = () => {
    const {fetchCalendarAnalytics} = this.props;
    const {filter} = this.state;
    fetchCalendarAnalytics({type: 'file', filter});
    fetchCalendarAnalytics({type: 'json', filter});
  }

  handleTimelineDropdown = (timeline) => {
    const {fetchCalendarAnalytics} = this.props;
    const query = Utils.manageTimelineDropdownActions(timeline);
    this.setState(prevState => ({...prevState, filter: query}));
    fetchCalendarAnalytics({type:'json', query});
  }

  renderButton (icon, text, onclickFunction) {
    return (
      <button
        type="button"
        className="actions__btn"
        onClick={onclickFunction}>
        <Fragment>
          <img src={icon} alt={text} />
        </Fragment>
      </button>
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
    const {travelCalendarData} = this.props;
    let calendarData;
    if(travelCalendarData){
      const data = travelCalendarData.data;
      calendarData = data.map(calender => (
        <Fragment key={calender.name}>
          <TravelCalendarDetails calendar={calender} />
        </Fragment>
      ));
    }
    return calendarData;
  }

  renderCalendarHeader (renderButton, handleTimeline) {
    return (
      <div className="calendar-header">
        <p className="title">Travel Calendar</p>
        <div className="actions">
          <TimelineDropdownCalendar
            icon={activeCalendar}
            defaultSelected="This week"
            dropDownItems={['Today', 'Tomorrow','This week', 'This month', 'Pick a date']}
            onClickItem={handleTimeline}
          />
          {renderButton}
        </div>
      </div>
    );
  }

  render(){
    const{ isLoading } = this.props;

    return (
      <Fragment>
        {this.renderCalendarHeader(
          this.renderButton(download, 'Export', this.getTravelCalendarCSV),
          this.handleTimelineDropdown
        )}
        {this.renderTravelCalendarDetails()}
        {isLoading && this.renderSpinner()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({travelCalendar}) => ({
  ...travelCalendar
});

const actionCreators = {
  fetchCalendarAnalytics
};

export default connect(mapStateToProps, actionCreators)(TravelCalendar);
