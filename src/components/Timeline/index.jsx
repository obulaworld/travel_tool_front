import React, {PureComponent, Fragment, createRef} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import RoomsGeomWrapper from './RoomsGeomWrapper';
import TimelineHeader from './TimelineHeader';
import TimelineVerticalAxis from './TimelineVerticalAxis';
import {getViewTypeProperties} from './helpers';
import {calendarConstants} from './settings';
import './Timeline.scss';

class Timeline extends PureComponent {
  constructor(props) {
    super(props);
    this.timelineSegmentsRef = createRef();
    this.state = {
      timelineViewType: 'month',
      timelineStartDate: moment().startOf('month'),
      timelineSegmentWidth: '',
      timelineChoicesOpen: false
    };
  }

  componentDidMount() {
    this.updateTimelineSegmentWidth();
    this.fetchTimelineData();
  }

  componentDidUpdate() {
    this.updateTimelineSegmentWidth();
  }

  fetchTimelineData = () => {
    const {fetchTimelineRoomsData} = this.props;
    const [startDateString, endDateString] = this.getTimelineRange();
    fetchTimelineRoomsData(startDateString, endDateString);
  }

  changeTimelineViewType = (userChoice) => {
    this.setState(prevState => {
      const knownPeriodTypes = ['week', 'month', 'year'];
      if (prevState.timelineViewType === userChoice) return prevState;
      if (!knownPeriodTypes.includes(userChoice)) userChoice = 'month';
      return {
        ...prevState,
        timelineViewType: userChoice,
        timelineStartDate: moment().startOf(userChoice)
      };
    }, this.fetchTimelineData);
  }

  handleNavigateTime = (type) => {
    // update timeline view
    const step = (type === 'increment') ? 1 : -1;
    return this.setState(prevState => {
      const {timelineStartDate, timelineViewType, periodOffset} = prevState;
      // don't mutate the timelineStartDate in state
      const cloneStartDate = timelineStartDate.clone();
      cloneStartDate.add(step, `${timelineViewType}s`);
      return {
        ...prevState,
        timelineStartDate: cloneStartDate
      };
    }, this.fetchTimelineData);
  }

  handleGoToToday = () => {
    this.setState(prevState => {
      const { timelineViewType } = prevState;
      return {
        ...prevState,
        timelineStartDate: moment().startOf(timelineViewType)
      };
    }, this.fetchTimelineData);
  }

  getTimelineRange = () => {
    const {timelineStartDate, timelineViewType} = this.state;
    const cloneStartDate = timelineStartDate.clone();
    const startDateString = cloneStartDate
      .format('YYYY-MM-DD');
    const endDateString = cloneStartDate.endOf(`${timelineViewType}`)
      .format('YYYY-MM-DD');
    return [startDateString, endDateString];
  }

  toggleTimelineChoices = () => {
    this.setState(prevState => ({
      ...prevState,
      timelineChoicesOpen: !prevState.timelineChoicesOpen
    }));
  }

  updateTimelineSegmentWidth = async () => {
    // ensure setState is done async after componentDidMount/componentDidUpdate
    const width = await Promise.resolve(
      this.timelineSegmentsRef.current.getBoundingClientRect().width
    );
    this.setState(prevState => ({
      ...prevState,
      timelineSegmentWidth: width
    }));
  }

  getTimelineViewTypeProperties = () => {
    const {
      timelineViewType,
      timelineSegmentWidth,
      timelineStartDate
    } = this.state;
    const {
      noOfSegments,
      noOfDaysPerSegment
    } = getViewTypeProperties(timelineStartDate, timelineViewType);
    return {
      timelineDayWidth: (timelineSegmentWidth/noOfDaysPerSegment),
      noOfSegments
    };
  }

  _computeSegmentDisplayValues = (segIndex, diffType, format) => {
    const {timelineStartDate, timelineViewType} = this.state;
    let current = moment().startOf('day');
    if(timelineViewType === 'year') // counts by months
      current = current.startOf('month');
    // don't mutate the timelineStartDate in state
    const cloneStartDate = timelineStartDate.clone();
    let segmentDate, segmentLabel, isCurrentPeriod;
    segmentDate = cloneStartDate.add(segIndex, diffType);
    isCurrentPeriod = current.diff(segmentDate, diffType) === 0;
    segmentLabel = segmentDate.format(format);
    return {segmentLabel, isCurrentPeriod};
  }

  getSegmentDisplayInfo = (index) => {
    const {timelineViewType} = this.state;
    switch (timelineViewType) {
    case 'week':
      return this._computeSegmentDisplayValues(index, 'days', 'ddd M/D');
    case 'year':
      return this._computeSegmentDisplayValues(index, 'months', 'MMM');
    case 'month':
    default:
      return this._computeSegmentDisplayValues(index, 'days', 'D');
    }
  }

  _constructTimelineSegment = (index, ref=undefined) => {
    const {timelineViewType} = this.state;
    const segNodeDispInfo = this.getSegmentDisplayInfo(index);
    const isCurrentClassName = segNodeDispInfo.isCurrentPeriod ? 'current' : '';
    const viewTypeClassName = `${timelineViewType}-view`;
    return (
      <div
        key={index}
        className={`timeline__segment ${isCurrentClassName} ${viewTypeClassName}`}
        ref={ref}
        data-segment-label={segNodeDispInfo.segmentLabel}
      />
    );
  }

  constructSelectedPeriodDisplay() {
    const {timelineStartDate, timelineViewType} = this.state;
    let startDateStr, endDateStr, weekStartDisp, weekEndDisp;
    switch (timelineViewType) {
    case 'year':
      return timelineStartDate.format('YYYY');
    case 'week':
      [startDateStr, endDateStr] = this.getTimelineRange();
      weekStartDisp = moment(startDateStr, 'YYYY-MM-DD').format('D');
      weekEndDisp = moment(endDateStr, 'YYYY-MM-DD').format('D MMM YYYY');
      return `${weekStartDisp} - ${weekEndDisp}`;
    case 'month':
    default:
      return timelineStartDate.format('MMMM YYYY');

    }
  }

  renderTimelineSegments = (availableSegSlotsCount) => {
    /**
     * Creates first node as a reference: good for determining the
        actual width of segments dynamically
     * @param {number} availableSegSlotsCount - number of timeline segments.
    */
    const ref = this.timelineSegmentsRef;
    const segmentsRefNode = this._constructTimelineSegment(0, ref);
    --availableSegSlotsCount;
    // other segments
    const availableSegSlots = new Array(availableSegSlotsCount).fill('');
    return (
      <Fragment>
        {segmentsRefNode}
        {availableSegSlots.map((slot, i) => this._constructTimelineSegment(++i))}
      </Fragment>
    );
  }

  render() {
    const {
      timelineStartDate,
      timelineChoicesOpen,
      timelineViewType,
      periodOffset
    } = this.state;
    const {rooms, updateRoomState, guestHouseId} = this.props;
    const { timelineDayWidth, noOfSegments } = this.getTimelineViewTypeProperties();
    return (
      <div className="timeline">
        <TimelineVerticalAxis
          rooms={rooms}
          updateRoomState={updateRoomState}
          timelineDateRange={this.getTimelineRange()}
          guestHouseId={guestHouseId}
        />
        <TimelineHeader
          selectedTimeDisplay={this.constructSelectedPeriodDisplay()}
          changeTimelineViewType={this.changeTimelineViewType}
          toggleChoices={this.toggleTimelineChoices}
          currentTimelineViewType={timelineViewType}
          onNavigateTime={this.handleNavigateTime}
          showChoices={timelineChoicesOpen}
          goToToday={this.handleGoToToday}
        />
        <div className="timeline__body">
          <div className="timeline__body-segments">
            {this.renderTimelineSegments(noOfSegments)}
            <RoomsGeomWrapper
              timelineStartDate={timelineStartDate}
              timelineViewType={timelineViewType}
              tripDayWidth={timelineDayWidth}
              rooms={rooms}
            />
          </div>
        </div>
      </div>
    );
  }
}

Timeline.propTypes = {
  rooms: PropTypes.array,
  fetchTimelineRoomsData: PropTypes.func.isRequired,
  updateRoomState: PropTypes.func.isRequired,
  guestHouseId: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
  rooms: []
};

export default Timeline;
