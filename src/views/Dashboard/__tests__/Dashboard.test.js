import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard, mapStateToProps } from '..';

const initialState = {
  analytics: {
    payload: {
      total_requests: 230
    },
    error: '',
    isLoading: false,
    success: false
  }
};

const props = {
  getCurrentUserRole: ['Travel Administrator'],
  history: {
    push: jest.fn()
  },
  departmentTrips: {
    report: [],
    loading: false,
  },
  fetchDepartmentTrips: jest.fn(),
  fetchReadiness: jest.fn(),
  readiness: {
    isLoading: false,
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Dashboard {...props} />
    </MemoryRouter>
  </Provider>
);

describe('<Dashboard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard {...props} />);
  });


  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('maps the correct state to props', () => {
    const mapper = mapStateToProps(
      {
        user : {getCurrentUserRole: ['Travel Admin']},
        analytics: {departmentTrips: {
          report: [],
          loading: false,
        }}
      });
    expect(mapper.getCurrentUserRole[0]).toEqual('Travel Admin');
  });
});
