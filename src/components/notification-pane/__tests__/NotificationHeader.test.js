import React from 'react';
import { shallow } from 'enzyme';// eslint-disable-line

import NotificationHeader
  from '../NotificationHeader';
  import testImage from '../../../images/logo.svg';


describe('Notification Header Component', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<NotificationHeader />);
    expect(wrapper.find('div.notifications-header').length).toBe(1);
  });

  it('should render the title', () => {
    const wrapper = shallow(<NotificationHeader />);
    expect(wrapper.find('div.notifications-header__title').text()).toBe('Notifications');
  });

  it('should render the close button', () => {
    const wrapper = shallow(<NotificationHeader />);
    expect(wrapper.find('img.notifications-header__close-btn').prop('src')).toBe('close-btn.svg');
  });
});
