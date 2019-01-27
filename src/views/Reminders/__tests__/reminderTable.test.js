import React from 'react';
import reminderData from '../../../redux/__mocks__/emailReminderConditionMockData';
import ReminderTable, {ReminderDetails} from '../ReminderTable';


const props = {
  createdAt: '10-12-2016',
  conditionName: 'Passport Completion Email',
  user: {
    fullName: 'Olamide Danso'
  },
  documentType: 'passport',
  setItemToDisable: jest.fn(),
  disabled: false,
  reminder: {
    reasons: [
      {
        reason: 'reason is reason is reason'
      }
    ]
  }
}

describe('render reminder table', () => {

  it('should render reminder table', () => {

    const wrapper = mount(
      <ReminderTable reminders={reminderData} />
    );
    const table = wrapper.find('table');
    expect(table.length).toEqual(1);
  });

  it('should render table rows to allow data', () => {
    const wrapper = mount(
      <ReminderDetails {...props} />
    );
    const details = wrapper.find('.table__rows');
    expect(details).toBeTruthy();
  });

  it('should render table rows to allow data', () => {
    const newProps = {
      ...props,
      disabled: true
    };
    const wrapper = mount(
      <ReminderDetails {...newProps} />
    );

    const event = { target: { preventDefault: jest.fn() } };
    const icon = wrapper.find('.tiny');

    icon.simulate('click', event);
    expect(props.setItemToDisable).toHaveBeenCalled();
  });
});
