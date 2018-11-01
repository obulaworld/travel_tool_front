import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import TimelineDropdown from '..';

const initialState = {
  isDropdownOpen: false
};

const props = {
  dropDownItems: ['Kenya', 'Uganda', 'Rwanda', 'Nigeria'],
  icon: 'http:/ss.ds',
  showDropdownItems: jest.fn(),
  hideDropdownItems: jest.fn(),
  renderDropDownItems: jest.fn(),
  handleFilter: jest.fn(),
};

const context = { name: 'foo' };
const wrapper = shallow(<TimelineDropdown {...props} />);
const wrapperInstance = wrapper.instance();

describe('<TimelineDropdown>', () => {
  it('should show the dropdown items when showDropDownItems is called', () => {
    wrapperInstance.showDropdownItems();
    expect(wrapper.state().isDropdownOpen).toEqual(true);
  });

  it('should hide the dropdown items when hideDropDownItems is called', () => {
    wrapperInstance.hideDropdownItems();
    expect(wrapper.state().isDropdownOpen).toEqual(false);
  });

  it('should render the correct dropdown items', () => {
    wrapperInstance.renderDropDownItems(props.dropDownItems);
  });
});
``