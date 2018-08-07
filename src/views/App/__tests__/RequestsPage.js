import React from 'react';
import { shallow } from 'enzyme';

import RequestsPage
  from '../../RequestsPage';


describe('Notification Container Component', () => {

  it('should render Requests Page successfully', () => {
    const wrapper = shallow(<RequestsPage />);
    expect(wrapper.find('NotificationPane').length).toBe(1);
  });
});
