import React from 'react';
import ReminderFormInputFields from '../ReminderFormInputFields';
import { Input } from '../../../FormsAPI';

const props = {
  totalReminders: 3,
  addNewReminder: jest.fn(),
  removeReminder: jest.fn(),
  onInputChange: jest.fn(),
  onReminderTemplateChange: jest.fn(),
  onReminderPeriodChange: jest.fn(),
  templates: [{
    id: '1',
    name: 'Email Reminder'
  }],
  currentPage: 3,
  loading: false,
  pageCount: 4,
  fetchAllEmailTemplates: jest.fn(),
}
describe('ReminderFormInputFields', () => {
  const setup = (props) => shallow(<ReminderFormInputFields {...props} />);
  it('should render correctly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the condition Input', () => {
    const wrapper = setup(props);
    const conditionInput = wrapper.find(Input).at(0);
    expect(conditionInput.length).toBe(1);
  });

  it('should render the correct number of reminder inputs', () => {
    const wrapper = setup(props);
    const remindersFieldset = wrapper.find('.reminders-fieldset');
    const totalInputs = remindersFieldset.find(Input);
    expect(totalInputs.length).toBe(9); // 3 input fields per reminder
  });
});
