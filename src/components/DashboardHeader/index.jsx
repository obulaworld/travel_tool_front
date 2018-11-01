import React, { PureComponent,  Fragment } from 'react';
import PropTypes from 'prop-types';

import './_header.scss';
import activeLocation from '../../images/icons/location_active.svg';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import InputRenderer, { Input, FormContext } from '../Forms/FormsAPI';
import availableRooms from '../../redux/reducers/availableRooms';
import SelectDropDown from '../SelectDropDown/SelectDropDown';
import TimelineDropdown from '../TimelineDropdown';

class DashboardHeader extends PureComponent {
  renderButton = (icon, text) => {
    const { downloadCsv } = this.props;
    return (
      <button type="button" className="action-btn" onClick={!text && (() => downloadCsv('?type=file'))}>
        {text}
        <img src={icon} alt={text} />
      </button>
    );
  };

  render() {
    const selectedChoice = 'This Week';
    return (
      <div className="DashboardHeader">
        <h2 className="title">Dashboard</h2>
        <div className="actions">
          {this.renderButton(activeLocation, 'Lagos')}
          <TimelineDropdown
            icon={activeCalendar}
            dropDownItems={['Today', 'Tomorrow','This Week', 'This Month', 'Pick a date']}
          />
          {this.renderButton(download)}
        </div>
      </div>
    );
  }
}

DashboardHeader.propTypes = {
  downloadCsv: PropTypes.func.isRequired
};

export default DashboardHeader;
