import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import ArrowIcon from './ArrowIcon';
import {timelineViewTypeChoices} from '../settings';
import dropdownIcon from '../../../images/icons/dropdown_inactive.svg';
import activeDropdownIcon from '../../../images/icons/dropdown_active.svg';
import './TimelineHeader.scss';

class TimelineHeader extends PureComponent {

  static propTypes = {
    currentTimelineViewType: PropTypes.string,
    selectedTimeDisplay: PropTypes.string,
    showChoices: PropTypes.bool,
    onNavigateTime: PropTypes.func.isRequired,
    changeTimelineViewType: PropTypes.func.isRequired,
    toggleChoices: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentTimelineViewType: 'month',
    showChoices: false,
    selectedTimeDisplay: ''
  }

  handleItemBlur = () => {
    const {toggleChoices, showChoices} = this.props;
    if (showChoices)
      toggleChoices();
  }

  getChangePeriodHandler = (type) => {
    return () => {
      const {onNavigateTime} = this.props;
      onNavigateTime(type);
    };
  }

  generateViewTypeChoices = () => {
    const {changeTimelineViewType, showChoices} = this.props;
    const status = showChoices
      ? 'active'
      : 'inactive';
    return (
      <div className={`timeline-view-choices choices-${status}`}>
        {
          timelineViewTypeChoices.map(choice => (
            <div
              key={choice.value}
              onClick={() => changeTimelineViewType(choice.value)}
              role="presentation"
              className="timeline-view-choice"
            >
              {choice.label}
            </div>
          ))
        }
      </div>
    );
  }

  renderViewTypeChoicesSelector = () => {
    const {toggleChoices, currentTimelineViewType} = this.props;
    return (
      <div
        className="timeline-view-type-selector selector"
        onKeyUp={()=>{}}
        onFocus={toggleChoices}
        onBlur={this.handleItemBlur}
        tabIndex="0"
        role="menu"
      >
        <span className="timeline-view-type value">
          {currentTimelineViewType}
        </span>
        <ArrowIcon
          iconClass="view-type-selector dropdown-icon"
          iconSrc={dropdownIcon}
        />
        {this.generateViewTypeChoices()}
      </div>
    );
  }

  renderTimelinePeriodNavigator = () => {
    const {selectedTimeDisplay} = this.props;
    return (
      <div className="timeline-period-selector selector">
        <span className="timeline-period value">
          {selectedTimeDisplay}
        </span>
        <div className="timeline-navigator">
          <ArrowIcon
            iconClass="timeline-navigator--previous"
            iconSrc={activeDropdownIcon}
            onClickIcon={this.getChangePeriodHandler('decrement')}
          />
          <ArrowIcon
            iconClass="timeline-navigator--next"
            iconSrc={activeDropdownIcon}
            onClickIcon={this.getChangePeriodHandler('increment')}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="timeline__body__header">
        {this.renderTimelinePeriodNavigator()}
        {this.renderViewTypeChoicesSelector()}
      </div>
    );
  }
}

export default TimelineHeader;
