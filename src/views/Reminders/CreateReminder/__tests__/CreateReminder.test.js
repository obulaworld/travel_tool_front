import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../../redux/reducers/reminders';
import CreateReminder from '..';

const state = {
  reminders: {
    ...initialState,
  },
  listEmailTemplatesReducer: {
    pagination: {
      pageCount: 2
    }
  }
};

const store = configureStore()(state);

describe('CreateReminder', () => {
  const props = {
    fetchAllEmailTemplates: jest.fn(),
    createReminder: jest.fn(),
    history: {
      push: jest.fn(),
    }
  };


  it('should render the Create Reminder page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateReminder {...props} />
        </MemoryRouter>
      </Provider>
    );
    const passportItem = wrapper.find('#Passport-Passport');
    passportItem.simulate('click');
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
