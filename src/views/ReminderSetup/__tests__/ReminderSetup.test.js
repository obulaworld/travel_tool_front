import React from 'react';
import ReminderSetup from '../index';

const props = {
  history: {
    push: jest.fn(),
  }
};
describe('<ReminderSetup> page', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ReminderSetup {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.resetAllMocks();
  });

  it('should open the Create New Reminder Template page when action button clicked', () => {
    wrapper.find('.action-btn').first().simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/settings/reminder-setup/create');
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
