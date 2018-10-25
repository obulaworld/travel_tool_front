import React, { PureComponent, Fragment } from 'react';
import '../SelectDropDown/SelectDropdown.scss';
import PropTypes from 'prop-types';

import './index.scss';
import RadioButton from '../RadioButton';

export default class TimelineDropdown extends PureComponent {
  static defaultProps = {
    icon: '',
    defaultSelected: '',
  }
  state = {
    isDropdownOpen: false,
    selectedItem: {}
  };

  componentWillMount() {
    const { defaultSelected, dropDownItems } = this.props;
    const selectedItem = dropDownItems.find(item => item === defaultSelected)
      || dropDownItems[0];
    this.setState(state => ({...state, selectedItem}));
  }

  selectItem = item => {
    this.setState({
      selectedItem: item
    });
  };

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

  handleItemClick = item => {
    const { onClickItem } = this.props;
    this.selectItem(item);
    onClickItem(item);
  };

  checkSelected = (item) => {
    const { selectedItem } = this.state;
    const isSelected = selectedItem === item ? 'selected': '';
    return isSelected;
  };

  renderDropDownItems(dropDownItems) {
    return (
      <ul>
        {dropDownItems.map(item => (
          <li
            id={`${item}`}
            key={item}
            className={`${this.checkSelected(item)}`}
            onClick={() => this.handleItemClick(item)}
            role="presentation">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {icon, dropDownItems} =this.props;
    const {isDropdownOpen, selectedItem} = this.state;
    return (
      <Fragment>
        <button type="button" className="action-btn" onClick={this.showDropdownItems}>
          {selectedItem}
          <img src={icon} alt="calendar-icon" />
        </button>
        <div className={`dropdown__content ${isDropdownOpen ? 'open': ''}`}>
          {this.renderDropDownItems(dropDownItems)}
        </div>
      </Fragment>
    );
  }
}

TimelineDropdown.propTypes = {
  icon: PropTypes.string,
  dropDownItems: PropTypes.array.isRequired,
  defaultSelected: PropTypes.string,
  onClickItem: PropTypes.func.isRequired,
};

