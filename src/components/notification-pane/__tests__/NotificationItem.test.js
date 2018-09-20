import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from '../NotificationItem';
import testImage from '../../../images/logo.svg';


describe('Notification Item Component', () => {
  const props = {
    isPending: true,
    name: 'Ademola Ariya',
    notificationStatus: 'unread',
    image: testImage,
    handleClick: ()=>{},
    id: ''
  };

  it('should render successfully if notification is pending', () => {
    const wrapper = shallow(<NotificationItem {...props} />);
    expect(wrapper.find('div.notification-item').length).toBe(1);
  });

  it('should render successfully if notification is general', () => {
    const newProps = {...props, isPending: false};
    const wrapper = shallow(<NotificationItem {...newProps} />);
    expect(wrapper.find('div.notification-item').length).toBe(1);
  });

  it('should render the user\'s name', () => {
    const wrapper = shallow(<NotificationItem {...props} />);
    expect(wrapper.find('span.notification--item__info__top__name').text())
      .toBe('@Ademola Ariya ');
  });

  it('should render the user\'s avatar', () => {
    const wrapper = shallow(<NotificationItem {...props} />);
    expect(wrapper.find('img.notification-item__image').exists())
      .toBe(true);
    expect(wrapper.find('img.notification-item__image').prop('src'))
      .toBe('logo.svg');
  });

  it('should render the unread-message-icon if message has not been read', () => {
    const wrapper = shallow(<NotificationItem {...props} />);
    expect(wrapper.find('img.msg-icon').prop('src'))
      .toBe('unread-message.svg');
  });

  it('should render the read-message-icon if message has been read', () => {
    const newProps = {...props, notificationStatus: 'read'};
    const wrapper = shallow(<NotificationItem {...newProps} />);
    expect(wrapper.find('img.msg-icon').prop('src'))
      .toBe('read-message.svg');
  });
});
