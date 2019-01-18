import React from 'react';
import { mount } from 'enzyme';
import UserTravelReadinessDetails from '..';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../../redux/reducers/travelReadinessDocuments';
import users from '../../__mocks__/users';

const state = {
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: users[0],
  },
  modal: {
    modal: {
      shouldOpen: false,
      modalType: 'test modal',
    }
  }
};

const store = configureStore()(state);

describe('UserTravelReadinessDetails', () => {
  const props = {
    userReadiness: users[0],
    match: {
      params: {
        userId: 'xufljSJvnos'
      }
    },
    location: {
      search: '/travel_readiness?id=EBUmAX3z1&type=passport',
    }
  };

  it('should render the Travel Readiness details page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserTravelReadinessDetails {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
