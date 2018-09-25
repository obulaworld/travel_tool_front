import React from 'react';
import { shallow } from 'enzyme';// eslint-disable-line

import {NotificationPane} from '../NotificationPane';

const props = {
  onCloseNotificationPane: jest.fn(),
  fetchUsersNotification: jest.fn(),
  notifications:[
    {
      recipientId: 'skgjdsgd',
      senderId: 'skgdkghdkgd',
      message: 'you have submitted a traveln request',
      notificationType: 'general'
    },
    {
      recipientId: 'skgjdsgd',
      senderId: 'skgdkghdkgd',
      message: 'you have submitted a traveln request',
      notificationType: 'pending'
    },
  ]
};
const wrapper = shallow(<NotificationPane {...props} />);

describe('Notification Pane Component', () => {
  it('should render successfully', () => {
    expect(wrapper.find('div.nav-pane').length).toBe(1);
  });

  it('should return pendingNotifications and generalNotification array', ()=>{
    expect(wrapper.instance().getNotifications().pendingNotifications.length).toEqual(1);
    expect(wrapper.instance().getNotifications().generalNotifications.length).toEqual(1);
  });
});
