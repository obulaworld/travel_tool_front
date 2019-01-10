import React from 'react';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedReadiness from '../index';

const props = {
  closeModal: sinon.spy(() => Promise.resolve()),
  openModal: sinon.spy(() => Promise.resolve()),
  modalType: 'add visa',
  shouldOpen: true,
  createTravelReadinessDocument: sinon.spy(() => Promise.resolve()),
};

const state = {
  createTravelReadinessDocument: {},
  modal: {
    modal: {

    }
  }
};

describe('renders <TravelReadinessDocuments />', () =>{
  const mockStore = configureStore();
  const store = mockStore(state);
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store} {...props}>
        <MemoryRouter>
          <ConnectedReadiness />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders add visa form', () => {
    const prop = {...props, shouldOpen: true};
    const wrapper = mount(
      <Provider store={store} {...prop}>
        <MemoryRouter>
          <ConnectedReadiness />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
