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
      messageOpened: false,
      image: testImage
    },
    {
      isPending: true,
      name: 'The Wasp',
      messageOpened: false,
      image: testImage
    },
    {
      isPending: true,
      name: 'Thor Ragnarok',
      messageOpened: false,
      image: testImage
    },
    ],
    generalNotifications: [{
      isPending: false,
      name: 'Ademola Ariya',
      messageOpened: false,
      image: testImage
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
