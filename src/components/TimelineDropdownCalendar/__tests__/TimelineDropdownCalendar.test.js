import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TimelineDropdown from '..';

const props = {
  dropDownItems: ['Kenya', 'Uganda', 'Rwanda', 'Nigeria'],
  onClickItem: sinon.spy(),
  icon: 'http:/ss.ds',
};

describe('<TimelineDropdown>', () => {
  it('should set the correct state on ComponentWillMount', () => {
    const wrapper = shallow(<TimelineDropdown
      {...{...props, defaultSelected: 'Kenya'}}
    />);
    expect(wrapper.instance().state).toEqual({
      isDropdownOpen: false,
      selectedItem: 'Kenya'
    });
  });

  it('should render the dropdown items when the container is clicked', () => {
    const wrapper = shallow(<TimelineDropdown {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'showDropdownItems');
    expect(wrapper.find('.dropdown__content').hasClass('open')).toEqual(false);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.dropdown__content').hasClass('open')).toEqual(true);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(4);
    expect(wrapper.instance().state).toEqual({
      isDropdownOpen: true,
      selectedItem: 'Kenya'
    });
  });

  it('renders the correct value of a list item when the item is selected', () => {
    const wrapper = shallow(<TimelineDropdown {...props} />);
    wrapper.simulate('click');
    const selectedItem = wrapper.find('li').last();
    selectedItem.simulate('click');
    expect(wrapper.find('button').text()).toBe('Nigeria');
  });

  it('closes when there is a click outside the component', () => {
    const eventMap = {};

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    const wrapper = shallow(<TimelineDropdown {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'hideDropdownItems');
    wrapper.find('button').simulate('click');
    eventMap.click({});
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.instance().state.isDropdownOpen).toEqual(false);
    expect(wrapper.find('.dropdown__content').hasClass('open')).toEqual(false);
  });

  it('should render the correct dropdown items', () => {
    const wrapper = shallow(<TimelineDropdown {...props} />);
    wrapper.simulate('click');
    expect(wrapper.find('li').length).toBe(4);
    const firstItem = wrapper.find('li').at(0);
    expect(firstItem.text()).toBe('Kenya');
  });
});