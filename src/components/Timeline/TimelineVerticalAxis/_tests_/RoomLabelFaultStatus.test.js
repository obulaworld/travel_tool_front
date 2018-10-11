import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RoomLabel from '../RoomLabel';

describe('<RoomLabel />', ()=> {
  const props = {
    updateRoomState: jest.fn(),
    name: 'qwetu',
    id: 'thjfsndj12',
    status: false,
    timelineDateRange: ['12/12/2018', '17/12/2018'],
    guestHouseId: 'fhdj212'
  };

  const props2 = {
    updateRoomState: jest.fn(),
    name: 'qwetu',
    id: 'thjfsndj12',
    status: true,
    timelineDateRange: ['12/12/2018', '17/12/2018'],
    guestHouseId: 'fhdj212'
  };
  window.date = {
    format: jest.fn(),
  };

  const shallowWrapper = shallow(<RoomLabel {...props} />);

  it('should match snapshot', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show checkbox on mount', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    const checkbox = wrapper.find('.is-visible');
    expect(checkbox.length).toBe(0);
  });

  it('should show checkbox after state changes', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    wrapper.setState({showMarkUnavailable: true });
    const checkbox = wrapper.find('.is-visible');
    expect(checkbox.length).toBe(1);
  });

  it('should show unmarked checkbox', () => {
    const wrapper = shallow(<RoomLabel {...props2} />);
    const checkbox = wrapper.find('.container_room_fault');
    expect(checkbox.length).toBe(1);
  });

  it('should show marked checkbox', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    const checkbox = wrapper.find('.container_room_fine');
    expect(checkbox.length).toBe(1);
  });

  it('calls update room status when clicked with status of true', () => {
    const shallowWrapper = shallow(<RoomLabel {...props2} />);
    const spy = sinon.spy(shallowWrapper.instance(), 'showId');
    const checkboxBlue = shallowWrapper.find('.container_room_fault');
    checkboxBlue.simulate('click');
    checkboxBlue.simulate('keyDown');
    expect(spy.calledTwice).toBe(true);
  });

  it('calls update room status when clicked with status of false', () => {
    const spy = sinon.spy(shallowWrapper.instance(), 'showId');
    const checkbox = shallowWrapper.find('.container_room_fine');
    checkbox.simulate('click');
    checkbox.simulate('keyDown');
    expect(spy.calledOnce).toBe(false);
  });

  it('changes the state of the elipses when clicked', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    const elipses = wrapper.find('.ellipsis');
    elipses.simulate('focus');
    expect(wrapper.state().showMarkUnavailable).toEqual(true);
  });
});
