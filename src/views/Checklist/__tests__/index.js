import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConnectedChecklist, { Checklist, mapStateToProps } from '../index';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';

travelChecklistMockData[0].destination = 'Nairobi';
const props = {
  openModal: sinon.spy(),
  closeModal: sinon.spy(),
  createTravelChecklist: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  deleteTravelChecklist: jest.fn(),
  shouldOpen: false,
  modalType: '',
  checklistItems: travelChecklistMockData,
  currentUser: { location: 'Nairobi' },
  isLoading: false
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
  requestsReducer: {
    requests: [],
    request: {},
    loading: false,
    errors: []
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  getCurrentUserRole: 'tomato',
  travelChecklist: { checklistItems: travelChecklistMockData }
};

let shallowWrapper, mountWrapper;
beforeEach(() => {
  shallowWrapper = shallow( <Checklist {...props} />);
  mountWrapper = mount(
    <Provider>
      <MemoryRouter>
        <Checklist {...props} />
      </MemoryRouter>
    </Provider>
  );
});

describe('<Checklist> component', () => {
  it('should render the Checklist page without crashing', () => {
    expect(shallowWrapper.length).toBe(1);
  });
  it('renders loading indicator if `isLoading is true`', () => {
    const wrapper = shallowWrapper;
    wrapper.setProps({ isLoading: true});
    expect(wrapper.find('#loading').length).toBe(1);
  });
  it('should call the setItemToDelete function', () => {
    const checklistItemId = 5
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    wrapperInstance.setItemToDelete(checklistItemId)();
    expect(wrapper.state().checklistItemId).toEqual(checklistItemId)
  });

  it('should call the handleEditItem function', () => {
    const checklistItem = {
      name: 'edit',
      id: 5
    }
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handleEditItem(checklistItem)();
    expect(wrapper.state().itemToEdit).toEqual(checklistItem)
  });

  it('should call the openAddModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { openModal } = props;
    wrapperInstance.openAddModal();
    expect(openModal.called).toEqual(true);
  });

  it('should call the openAddModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { openModal } = props;
    wrapperInstance.openEditModal();
    expect(openModal.called).toEqual(true);
  });

  it('should call the closeModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { closeModal } = props;
    wrapperInstance.closeEditModal();
    expect(closeModal.called).toEqual(true);
  });

  it('should call the deleteChecklistItem function', () => {
    const event = { preventDefault: () => {} };
    const state = {
      itemToEdit: null,
    deleteReason: '',
    checklistItemId: ''
    }
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { deleteTravelChecklist } = props;
    wrapperInstance.deleteChecklistItem(event);
    expect(deleteTravelChecklist).toBeCalledWith(state.checklistItemId, state);
  });

  it('should call handleInputChange function', () => {
    let event = { target: { value: '' } };
    const wrapper = shallowWrapper;
    event.target.value = 'We need more items';
    const input = wrapper.find('.delete-checklist-item__input')
    input.simulate('change', event)
    expect(wrapper.instance().state.deleteReason).toBe('We need more items');
  })

  it('maps state to props and return the expected object', () => {
    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };
    const user = {
      currentUser: {},

    };
    const travelChecklist = {
      isLoading: false,
      checklistItems: travelChecklistMockData
    };
    const props = mapStateToProps({ modal, user, travelChecklist });
    expect(props).toEqual({
      ...modal.modal,
      checklistItems: travelChecklist.checklistItems,
      currentUser: user.currentUser,
      isLoading: travelChecklist.isLoading
    });
  });

  test('should have default deleteTravelChecklist', () => {
    const result = Checklist.defaultProps.deleteTravelChecklist();
    expect(result).toEqual(undefined);
  });

  test('should have default updateTravelChecklist', () => {
    const result = Checklist.defaultProps.updateTravelChecklist();
    expect(result).toEqual(undefined);
  });
});
