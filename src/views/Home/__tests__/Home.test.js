import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import ConnectedHome, { Home } from '..';

const initialState = {
  payload: [],
  error: '',
  isLoading: false,
  success: false,
  message: ''
};

const mockStore = configureStore();
const store = mockStore(initialState);
let wrapper, props, fetchTeammates;


beforeEach(() => {
  props = {
    teammates: {
      payload: [
        {
          name: 'Alice Doe',
          picture: 'https://randomuser.me/api/portraits/men/25.jpg',
          destination: 'Lagos',
          departureDate: '2019-10-16',
          returnDate: '2018-07-20'
        }
      ]
    },
    requests: [],
    location: {
      search: '?location'
    },
    user: {},
    creatingRequest: false,
    availableRooms: {},
    requestOnEdit: {},
    department: 'TDD',
    fetchTeammates: jest.fn(),
    fetchUserRequests: jest.fn(),
    occupations: [],
    updateUserProfile: jest.fn(),
    createNewRequest: jest.fn(),
    editRequest: jest.fn(),
    openModal: jest.fn(),
    fetchAvailableRooms: jest.fn(),
    fetchAvailableRoomsSuccess: jest.fn(),
    closeModal: jest.fn(),
    fetchRoleUsers: jest.fn(),
    getOccupation: jest.fn(),
    loading: false,
    isFetching: false
  };
});

describe('<Home />', () => {
  it('calls ComponentDidMount', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Home {...props} />
      </MemoryRouter>
    ).dive().dive();
    expect(props.fetchTeammates).toHaveBeenCalled();
  });

  it('call getDerivedStateFromProps and update the state', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Home {...props} />
      </MemoryRouter>
    ).dive().dive();
    wrapper.setProps({
      ...props,
      department: 'Success'
    });
    expect(props.fetchTeammates).toHaveBeenCalled();
    expect(props.fetchUserRequests).toHaveBeenCalled();
    expect(props.fetchRoleUsers).toHaveBeenCalled();
    expect(props.getOccupation).toHaveBeenCalled();
    expect(wrapper.instance().state.department).toBe('Success');
  });

  it('call getDerivedStateFromProps but update the state', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Home {...props} />
      </MemoryRouter>
    ).dive().dive();
    wrapper.setProps({
      ...props
    });
    expect(props.fetchTeammates).toHaveBeenCalled();
    expect(wrapper.instance().state.department).toBe('TDD');
  });
});
