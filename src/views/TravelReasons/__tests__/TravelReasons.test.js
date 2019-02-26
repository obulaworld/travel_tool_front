import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockData from '../__mocks__/TravelReasons';
import { TravelReasons } from '../index';

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
    editTravelReason: jest.fn(),
    fetchTravelReason: jest.fn(),
    travelReason: {
      pagination,
      travelReasons,
      editReason: {
        title: 'Some title',
        description: 'Some description'
      }
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
      isLoading: false,
      travelReasons
    },
    modal: {
      modal: {
        shouldOpen: false,
        modalType: ''
      }
    }
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  let wrapper;

  beforeEach(() => {
    wrapper = mount( <TravelReasons {...props} store={store} />);
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the create travel reason modal', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'create travel reasons'});

    wrapper.find('.btn-new-request').simulate('click');
    expect(wrapper.find('Modal').first().props().visibility).toEqual('visible');
  });

  it('creates a travel reason when the create button is clicked', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'create travel reasons'});

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    expect(props.createTravelReason).toHaveBeenCalled();
  });

  it('should open the edit travel reasons modal', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'edit travel reasons'});

    wrapper.find('.table__menu-list .edit').simulate('click');

    expect(wrapper.find('Modal').first().props().visibility).toEqual('visible');
    expect(wrapper.find('input[name="title"]').props().value).toEqual('Some title');
    expect(wrapper.find('textarea[name="description"]').props().value).toEqual('Some description');
  });
});
