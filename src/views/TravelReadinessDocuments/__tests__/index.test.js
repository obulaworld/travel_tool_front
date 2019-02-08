import React from 'react';
import { mount } from 'enzyme';
import TravelReadinessDocuments from '..';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../redux/reducers/travelReadinessDocuments';
import users from '../__mocks__/users';

const state = {
  travelReadinessDocuments: {
    ...initialState,
    users,
  }
};

const store = configureStore()(state);

describe('TravelReadinessDocuments', () => {
  const props = {
    users,
    location: {
      search: 'successs'
    }
  };

  it('should render the Travel Readiness page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelReadinessDocuments {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
