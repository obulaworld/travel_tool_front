import React from 'react';
import { shallow } from 'enzyme';// eslint-disable-line

import NotificationPane from '../NotificationPane';

  const props = {
    onCloseNotificationPane: jest.fn()
  };

describe('Notification Pane Component', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<NotificationPane {...props} />);
    expect(wrapper.find('div.nav-pane').length).toBe(1);
  });
});
