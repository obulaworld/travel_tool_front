import React from 'react';
import { shallow } from 'enzyme'; 
import NotificationContainer from '../NotificationContainer';
import testImage from '../../../images/logo.svg';

describe('Notification Container Component', () => {
  const props = {
    title: 'Pending Approvals',
    pendingNotifications: [{
      isPending: true,
      name: 'Captain America',
      notificationStatus: 'unread',
      image: testImage,
      id: 'id1'
    },
    {
      isPending: true,
      name: 'The Wasp',
      notificationStatus: 'unread',
      image: testImage,
      id: 'id2'
    },
    {
      isPending: true,
      name: 'Thor Ragnarok',
      notificationStatus: 'unread',
      image: testImage,
      id: 'id3'
    },
    ],
    generalNotifications: [{
      isPending: false,
      name: 'Ademola Ariya',
      notificationStatus: 'unread',
      image: testImage,
      id: 'id11'
    }]
  };

  it('should render Pending Approvals successfully', () => {
    const wrapper = shallow( <NotificationContainer {...props
    }
    />);
    expect(wrapper.find('NotificationItem').length).toBe(3);
  });

  it('should render General Notifications successfully', () => {
    const newProps = { ...props,
      title: 'General Notifications'
    };
    const wrapper = shallow( <NotificationContainer {...newProps
    }
    />);
    expect(wrapper.find('NotificationItem').length).toBe(1);
  });
});
