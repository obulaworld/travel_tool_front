import React from 'react';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedReadiness from '../index';
import { initialState } from '../../../redux/reducers/travelReadinessDocuments';
import users from '../../TravelReadinessDocuments/__mocks__/users';

const props = {
  closeModal: sinon.spy(() => Promise.resolve()),
  openModal: sinon.spy(() => Promise.resolve()),
  modalType: 'add visa',
  userReadiness:  sinon.spy(() => Promise.resolve()),

  shouldOpen: false,
  createTravelReadinessDocument: sinon.spy(() => Promise.resolve()),
  user: {
    currentUser:{
      userId: '1200'
    }
  },
  currentUser: {
    userId: '1200'
  }
};

const state = {
  createTravelReadinessDocument: {},
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: users[0],
    documents: {},
    errors:{},
    isLoading: false
  },
  modal: {
    modal: {

    }
  },
  user: {
    currentUser:{
      userId: '1200'
    }
  }
};

describe('renders <TravelReadinessDocuments />', () =>{
  const mockStore = configureStore();
  const store = mockStore(state);
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders add visa form', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...{...props, shouldOpen:true}} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
