import React, { PureComponent, Fragment } from 'react';
import '../SelectDropDown/SelectDropdown.scss';
import PropTypes from 'prop-types';

import './index.scss';
import RadioButton from '../RadioButton';
import { Consumer } from '../../views/Dashboard/DashboardContext/FilterContext';

export default class TimelineDropdown extends PureComponent {
  static defaultProps = { icon: '' };
  state = { isDropdownOpen: false };

  showDropdownItems = () => {
    this.setState({
      isDropdownOpen: true
    });
    document.addEventListener('click', this.hideDropdownItems);
  };

  hideDropdownItems = () => {
    this.setState({
      isDropdownOpen: false
    });
    document.removeEventListener('click', this.hideDropdownItems);
  };

  renderDropDownItems(dropDownItems) {
    return (
      <Consumer>
        {(context) => (
          <ul>
            {dropDownItems.map(item => (
              <li
                id={`${item}`}
                key={item}
                onClick={() => context.handleFilter(item)}
                role="presentation">
                {item}
              </li>
            ))}
          </ul>
        )}
      </Consumer>
    );
  }

  render() {
    const { icon, dropDownItems } =this.props;
    const { isDropdownOpen } = this.state;
    return (
      <Consumer>
        {(context) => (
          <Fragment>
            <button type="button" className="action-btn" onClick={this.showDropdownItems}>
              {context.state.filter}
              <img src={icon} alt="calendar-icon" />
            </button>
            <div className={`dropdown__content ${isDropdownOpen ? 'open': ''}`}>
              {this.renderDropDownItems(dropDownItems)}
            </div>
          </Fragment>
        )}
      </Consumer>
    );
  }
}

TimelineDropdown.propTypes = {
  icon: PropTypes.string,
  dropDownItems: PropTypes.array.isRequired,
};
