import React, { PureComponent,  Fragment } from 'react';

import './_header.scss';
import activeLocation from '../../images/icons/location_active.svg';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import InputRenderer, { Input, FormContext } from '../Forms/FormsAPI';
import availableRooms from '../../redux/reducers/availableRooms';
import SelectDropDown from '../SelectDropDown/SelectDropDown';
import TimelineDropdown from '../TimelineDropdown';

const choices = [{
  name: 'This Week',
  value: 'This Week'
}, {name: 'Today',
  value: 'Today'
}, {name: 'This Month',
  value: 'This Month'
}, {name: 'Pick a date',
  value: 'Pick a date'
}];

class DashboardHeader extends PureComponent {
  renderButton = (icon, text) => (
    <button type="button" className="action-btn">
      <Fragment>
        {text}
        <img src={icon} alt={text} />
      </Fragment>
    </button>
  );

  render() {
    const selectedChoice = 'This Week';
    return (
      <div className="DashboardHeader">
        <h2 className="title">Dashboard</h2>
        <div className="actions">
          {this.renderButton(activeLocation, 'Lagos')}
          <TimelineDropdown
            icon={activeCalendar}
            defaultSelected="This week"
            dropDownItems={['Today', 'Tomorrow','This week', 'This month', 'Pick a date']}
            onClickItem={(item) => {}}
          />
          {this.renderButton(download)}
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
