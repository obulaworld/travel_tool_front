import React from 'react';
import Cookie from 'cookies-js';
import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';

// describe what we are testing
describe('Render NavBar component', () => {
  const props = {
    onNotificationToggle: jest.fn(),
    avatar: 'avatar',
    history: {
      push: jest.fn()
    }
  };
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the navbar as expected', () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should render the OnNotification click as exepected', () => {
    const wrapper = shallow(<NavBar {...props} />);
    let NotificationToggleSpy = jest.spyOn(
      wrapper.instance().props,
      'onNotificationToggle'
    );
    wrapper
      .find('#notification')
      .first()
      .simulate('click');
    expect(NotificationToggleSpy).toHaveBeenCalled();
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = shallow(<NavBar {...props} />);
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  })
});
