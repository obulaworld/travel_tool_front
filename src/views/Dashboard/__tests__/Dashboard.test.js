import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard, mapStateToProps } from '..';

const props = {
  getCurrentUserRole: ['Travel Administrator'],
  history: {
    push: jest.fn()
  },
  departmentTrips: {
    report: [],
    loading: false,
  },
  fetchDepartmentTrips: jest.fn()
};

const mockStore = configureStore();
const store = mockStore({});

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
