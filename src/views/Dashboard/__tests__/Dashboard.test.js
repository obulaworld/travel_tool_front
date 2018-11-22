import React from 'react';
import { shallow } from 'enzyme';
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
  exportReadiness: jest.fn(),
  downloadCsv: jest.fn(),
  downloadAnalytics: jest.fn(),

  readiness: {
    isLoading: false,
  },
  isLoaded: false,
};

localStorage.setItem('location', 'Nairobi, Kenya');
jest.mock('../../../helper/permissions', () => jest.fn());

describe('<Dashboard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard {...props} />);
  });


  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
