import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import selectDropdownIcon from '../../../../../images/icons/form_select_dropdown.svg';

export default class DropdownSelect extends Component {

  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: '',
    error: ''
  }

  state = {
    dropdownOpen: false
  }

  getSelectOptions(choices) {

    const choiceItems = choices
      .map((option, id) => (
        <li key={option}>
          <div
            onClick={()=>this.handleOptClick(option)}
            onKeyPress={()=>{}}
            role="button"
            tabIndex="0"
          >
            {option}
          </div>
        </li>
      ));

    return (
      <ul className={`select-menu select-menu--${this.getDropdownStatus()}`}>
        {choiceItems}
      </ul>
    );
  }

  getDropdownStatus = () => {
    const {dropdownOpen} = this.state;
    const dropdownStatus = dropdownOpen? 'active': 'inactive';
    return dropdownStatus;
  }

  getPropsObject = () => {
    const { className, error } = this.props;
    const _props = { ...this.props };
    ['labelNote', 'selectOptions', 'handleSelect', 'selectedDate'].map(
      item => delete _props[item]
    );

    const props = {
      ..._props,
      onClick: this.handleToggleDropdown,
      onKeyPress: () => {},
      role: 'button',
      tabIndex: '0',
      className: `input select ${error ? 'error' : ''} ${
        className ? className : ''
      }`
    };
    return props;
  };

  handleOptClick = (choice) => {
    const { onChange } = this.props;
    onChange(choice);
    this.handleToggleDropdown();
  }

  handleToggleDropdown = (e) => {
    const {dropdownOpen} = this.state;
    this.setState(() => ({
      dropdownOpen: !dropdownOpen
    }));
  }

  render() {
    const {choices, value, className} = this.props;
    const options = this.getSelectOptions(choices);

    return (
      <div style={{position:'relative'}}>
        <div
          {...this.getPropsObject()}
        >
          <div className="value">
            {value}
            <div className={`select-dropdown ${this.getDropdownStatus()}`}>
              <img src={selectDropdownIcon} alt="icn" />
            </div>
          </div>
          { options }
        </div>
      </div>
    );
  }
}
