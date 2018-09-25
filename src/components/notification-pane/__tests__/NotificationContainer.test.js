import React from 'react';
import { shallow } from 'enzyme';
import NotificationContainer from '../NotificationContainer';
import testImage from '../../../images/logo.svg';

describe('Notification Container Component', () => {
  const customProps = {
    title: 'Pending Approvals',
    pendingNotifications: [{
      isPending: true,
      name: 'Captain America',
      notificationStatus: 'unread',
      notificationType: 'pending',
      image: testImage,
      id: 'id1'
    },
    {
      isPending: true,
      name: 'The Wasp',
      notificationStatus: 'unread',
      notificationType: 'pending',
      image: testImage,
      id: 'id2'
    },
    {
      isPending: true,
      name: 'Thor Ragnarok',
      notificationStatus: 'unread',
      notificationType: 'pending',
      image: testImage,
      id: 'id3'
    },
    ],
    generalNotifications: [{
      isPending: false,
      name: 'Ademola Ariya',
      notificationStatus: 'unread',
      notificationType: 'general',
      image: testImage,
      id: 'id11'
    }],
    updateAllNotificationStatus: jest.fn(),
    handleClick: jest.fn()
  };

  const setup = (props = customProps) => shallow( <NotificationContainer {...props} />);

  it('should render Pending Approvals successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  it('should render General Notifications successfully', () => {
    const newProps = { ...customProps,
      title: 'General Notifications'
    };
    const wrapper = setup(newProps);
    expect(wrapper.find('NotificationItem').length).toBe(1);
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

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
      const wrapper = setup();

      const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
      wrapper.instance().handleMarkAllAsRead();
      expect(handleMarkAllAsReadSpy).toHaveBeenCalled();

      done();
    });

  it(`should call 'handleMarkAllAsRead'
    if 'mark all as read' button is clicked`, (done) => {
      const wrapper =
        setup({ ...customProps, title: 'General Notifications' });

      const handleMarkAllAsReadSpy =
        jest.spyOn(wrapper.instance(), 'handleMarkAllAsRead');
      wrapper.instance().handleMarkAllAsRead();
      expect(handleMarkAllAsReadSpy).toHaveBeenCalled();

      done();
    });
});
