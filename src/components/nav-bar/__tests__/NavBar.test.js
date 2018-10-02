import React from 'react';
import Cookie from 'cookies-js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';
import notificatonsMockData from '../__mocks__/notificationMockData';

const props = {
  onNotificationToggle: jest.fn(),
  avatar: 'avatar',
  history: {
    push: jest.fn()
  },
  openSearch: true,
  handleHideSearchBar: jest.fn(),
  notifications: [...notificatonsMockData],
  user: {
    UserInfo: {
      name: 'Tomato Jos',
      picture: 'http://picture.com/gif'
    }
  },
  location: {
    search: 'search=gjg',
    pathname: 'requests'
  }
};

const setup = () => shallow(<NavBar {...props} />);

// describe what we are testing
describe('Render NavBar component', () => {
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the navbar as expected', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should render the OnNotification click as exepected', () => {
    const wrapper = setup();
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
    const wrapper = setup();
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should should be search bar for phone view toggle display', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = setup();
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should render dropdown items contain logout link when button is clicked', ()=>{
    const wrapper = mount(<NavBar {...props} />);
    expect(wrapper.state('hideLogoutDropdown')).toBe(true);
    wrapper.find('#demo-menu-lower-right').simulate('click');
    expect(wrapper.state('hideLogoutDropdown')).toBe(false);
  });

  it('should hide  logout Dropdown when dropdown button is clicked twice', ()=>{
    const wrapper = mount(<NavBar {...props} />);
    wrapper.instance().hideDropdown();
    expect(wrapper.state('hideLogoutDropdown')).toBe(true);
  });

  it('should call `getUnreadNotifictionsCount` on component render',
    (done) => {
      const wrapper = setup();

      const getUnreadNotificationsCountSpy =
      jest.spyOn(wrapper.instance(), 'getUnreadNotificationsCount');
      wrapper.instance().getUnreadNotificationsCount();
      expect(getUnreadNotificationsCountSpy).toHaveBeenCalled();

      done();
    });

  it('should update state when onChange function is triggered', () => {
    const wrapper = mount(<NavBar {...props} />);
    const event = {
      target: {
        value: 'kampala'
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state('keyword')).toBe(event.target.value);
  });

  it('should call history push function when onSubmit is triggered', () => {
    const wrapper = mount(<NavBar {...props} />);
    wrapper.setState({ keyword: 'Kampala' });
    wrapper.instance().onSubmit();
    expect(props.history.push).toHaveBeenCalled();
  });

});
