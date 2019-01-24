import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import selectDropdownIcon from '../../../../../images/icons/form_select_dropdown.svg';
import DropdownOptions from './DropdownOptions';

export default class DropdownSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    onChange: PropTypes.func.isRequired,
    choices: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object)]).isRequired,
    value: PropTypes.string,
    size: PropTypes.string
  };

  static defaultProps = {
    className: '',
    error: '',
    value: '',
    size: ''
  };

  constructor(props) {
    super(props);

    this.dropDownRef = React.createRef();
    this.state = {
      dropdownOpen: false
    };
  }

  getSelectOptions(choices) {
    const { loading } = this.props;
    return (
      <DropdownOptions
        items={choices}
        handleClick={this.handleOptClick}
        getDropdownStatus={this.getDropdownStatus}
        dropDownRef={this.dropDownRef}
        loading={loading}
        handleScroll={this.handleDropDownScroll}
      />
    );
  }

  handleDropDownScroll = (e) => {
    const { templatesCount, fetchAllEmailTemplates, currentPage, pageCount } = this.props;
    const dropDownListItemHeight = 32;
    const listTotalHeight = templatesCount * dropDownListItemHeight;
    const dropDownHeight = 140;
    const scrolled = e.target.scrollTop;
    const isAtListEnd = scrolled === listTotalHeight - dropDownHeight;
    if (isAtListEnd && pageCount !== currentPage) {
      fetchAllEmailTemplates(`?page=${currentPage + 1}`);
    }
  }

  getDropdownStatus = () => {
    const { dropdownOpen } = this.state;
    const dropdownStatus = dropdownOpen ? 'active' : 'inactive';
    return dropdownStatus;
  };

  getPropsObject = () => {
    const { className, error } = this.props;
    const _props = { ...this.props };
    ['labelNote', 'selectOptions', 'handleSelect', 'handleDropDown', 'currentPage',
      'selectedDate', 'fetchAllEmailTemplates', 'templatesCount', 'loading', 'pageCount'].map(
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

  handleOptClick = choice => {
    const { onChange, handleDropDown } = this.props;
    onChange(choice);
    this.handleToggleDropdown();
    handleDropDown ? handleDropDown(this.props, choice) : null;
  };

  handleToggleDropdown = e => {
    const { dropdownOpen } = this.state;
    const { onClick } = this.props;
    onClick && onClick(e);
    this.setState(() => ({
      dropdownOpen: !dropdownOpen
    }));
  };

  valueToChoiceLabel = (choices, value) => {
    let choice =
      choices.filter(choice => {
        return (choice.value || choice) === value;
      })[0] || '';
    choice = !choice ? ' ' : choice;
    return choice.label || choice || value;
  };

  render() {
    const { choices, value, size } = this.props;
    const options = this.getSelectOptions(choices);
    return (
      <div style={{ position: 'relative' }}>
        <div {...this.getPropsObject()}>
          <div className="value" style={{ width: size }}>
            {this.valueToChoiceLabel(choices, value)}
            <div className={`select-dropdown ${this.getDropdownStatus()}`}>
              <img src={selectDropdownIcon} alt="icn" />
            </div>
          </div>
          {options}
        </div>
      </div>
    );
  }
}
