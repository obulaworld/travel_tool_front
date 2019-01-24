import React from 'react';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedReminders from '../index';

const mockStore = configureStore();

const store = mockStore();

describe('Reminder component', () => {
  it('should render the Reminder page without crashing', () => {
    const props = {
      history: {
        push: jest.fn()
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReminders {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
