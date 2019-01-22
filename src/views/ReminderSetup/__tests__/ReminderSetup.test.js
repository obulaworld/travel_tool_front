import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ReminderSetup from '..';
import listOfTemplates from '../__mocks__';

describe('<ReminderSetup />', () => {
  const { templates, pagination } = listOfTemplates;
  const props = {
    fetchTemplates: jest.fn(),
    location: {},
    history: {
      push: jest.fn(),
    }
  };
  const state = {
    listEmailTemplatesReducer: {
      templates,
      pagination,
    }
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ReminderSetup {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
