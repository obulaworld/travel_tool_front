import React from 'react';
import { mount, shallow } from 'enzyme';
import mockData from '../../../mockData/travelStipend';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import {  MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { TravelStipends, mapStateToProps } from '..';

const { stipends } = mockData;
let props = {
  travelStipends : {
    travelStipends: {},
    errors: [],
    isLoading: false,
    stipends
  },
  centers: {
    center: [
      {
        location: 'kigali'
      },
    ]
  },
  handleCreateTravelStipend: jest.fn(() => {}),
  CreateTravelStipend: jest.fn(() => {}),
  isLoading: false,
  createNewRequest: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  fetchCenters: jest.fn(),
  modalType: 'create travel stipend',
  openModal: sinon.spy(() => Promise.resolve()),
  closeModal: sinon.spy(() => Promise.resolve()),
  fetchAllTravelStipends: jest.fn(),
  fetchSingleTravelStipend: jest.fn(),
  deleteTravelStipend: jest.fn()
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  },
  travelStipends: {
    errors: {},
    stipends,
    isLoading: false
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('<TravelStipends>', () => {
  it('should render the TravelStipends page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders as expected', () => {
    const wrapper = mount(
      <MemoryRouter>
        <TravelStipends {...props} />
      </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });


  it('should set `shouldOpen` prop to `true` when add stipend button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends {...{...props, shouldOpen: true, modalType: 'create travel stipend'}} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.btn-new-request').simulate('click');
    expect(wrapper.find('TravelStipends').props().shouldOpen).toBe(true);
    expect(props.openModal.called).toBe(true);
  });

  it('should set `visibility` prop to `visible` when add stipend button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends
            {...{ ...props, shouldOpen: true, modalType: 'create travel stipend' }}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });

  it('should close modal when close button is clicked', ()=>{
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends
            {...{ ...props, shouldOpen: true, modalType: 'create travel stipend' }}
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.find('button.modal-close').simulate('click');
    expect(props.closeModal.called).toBe(true);
  });

  it('maps state to props and return the expected object', () => {
    const travelStipends = {
      travelStipends: {},
    };

    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };

    const centers = {
      center: [
        {
          location: 'kigali'
        }
      ]
    };

    const props = mapStateToProps({travelStipends, modal, centers});
    expect(props).toEqual({
      ...travelStipends, ...modal.modal,
      centers: centers,
      travelStipends: travelStipends,
    });
  });
});
