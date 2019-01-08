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
  shouldOpen: false,
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

  it('should change the action button\'s name when the tabs are switched', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...props} />
        </MemoryRouter>
      </Provider>
    );
    const visaButton = wrapper.find('#visaButton');
    visaButton.simulate('click');
    let actionButton = wrapper.find('#actionButton');

    expect(actionButton.text()).toEqual('Add Visa');

    const passportButton = wrapper.find('#passportButton');
    passportButton.simulate('click');
    actionButton = wrapper.find('#actionButton');

    expect(actionButton.text()).toEqual('Add Passport');
    wrapper.unmount();
  });

  it('should open the add passport modal when the add passport button is clicked',
    () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ConnectedReadiness {...props} />
          </MemoryRouter>
        </Provider>
      );

      const actionButton = wrapper.find('#actionButton');
      actionButton.simulate('click');

      setTimeout(() => {
        const displayedModal = wrapper.find('.modal.visible.add-document-item');
        const displayedModalTitle = wrapper.find('.modal.visible.add-document-item .modal-title');
        expect(displayedModal.length).toEqual(1);
        expect(displayedModalTitle.text()).toEqual('Add Passport');
      }, 200);
    });

  it('should open the add visa modal when the add visa button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...props} />
        </MemoryRouter>
      </Provider>
    );
    const visaButton = wrapper.find('#visaButton');
    visaButton.simulate('click');
    let actionButton = wrapper.find('#actionButton');
    actionButton.simulate('click');

    setTimeout(() => {
      const displayedModal = wrapper.find('.modal.visible.add-document-item');
      const displayedModalTitle = wrapper.find('.modal.visible.add-document-item .modal-title');
      expect(displayedModal.length).toEqual(1);
      expect(displayedModalTitle.text()).toEqual('Add Visa');
    }, 200);
  });
});
