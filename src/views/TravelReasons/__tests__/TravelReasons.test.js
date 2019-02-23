import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockData from '../__mocks__/index';
import TravelReasonsContainer from '../index';

describe('<ConnectedTravelReasons />', () => {
  const { metaData3: {travelReasons, pagination}} = mockData;
  const props = {
    fetchAllTravelReasonsAction: jest.fn(),
    createTravelReason: jest.fn(),
    viewTravelDetails: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    shouldOpen: false,
    modalType: '',
    travelReason: {
      pagination
    },
    location: {},
    history: {
      push: jest.fn()
    },
    modal: {
      modal: {
        modal: {
          openModal: jest.fn(),
          closeModal: jest.fn(),
          shouldOpen: false
        }
      }
    }
  };

  const state = {
    travelReason: {
      errors: {},
      pagination,
      isLoading: false
    },
    modal: {
      modal: {
        modal: {
          openModal: jest.fn(),
          closeModal: jest.fn(),
          shouldOpen: false
        }
      }
    }
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <TravelReasonsContainer {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
