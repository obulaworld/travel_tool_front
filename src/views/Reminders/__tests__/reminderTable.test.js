import React from 'react';
import reminderData from '../../../redux/__mocks__/emailReminderConditionMockData';
import ReminderTable, {ReminderDetails} from '../ReminderTable';



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
      <ReminderDetails
        createdAt="10-12-2016"
        conditionName="Passport Completion Email"
        user={{fullName: 'Olamide Danso'}}
        documentType="passport"
      />
    );
    const details = wrapper.find('.table__rows');
    expect(details).toBeTruthy();
  });
});
