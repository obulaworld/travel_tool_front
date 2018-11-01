import React from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { TravelReadiness } from '../index';
import travelReadinessData from '../__mocks__/travelReadinessMockData';
import AnalyticsReport from '../../AnalyticsReport';

const defaultProps = {
  readiness: {
    response: travelReadinessData,
    isLoading: false
  },
  fetchReadiness: jest.fn(),
  renderButton: jest.fn(),
  departmentTrips: {
    report: ''
  },
  fetchDepartmentTrips: jest.fn,
};
const setup = (props) => {
  const actualProps = props || defaultProps;
  return shallow(<TravelReadiness {...actualProps} />);
};
describe('Test suite for Travel Readiness Component', () => {
  it('should render the component properly', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });
  it('should match the snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call fetchReadiness when export button is clicked', () => {
    const mountWrapper = mount(
      <Provider>
        <MemoryRouter>
          <AnalyticsReport {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    const button = mountWrapper.find('.analyticsReport__export-button').first();
    button.simulate('click');
    expect(defaultProps.fetchReadiness).toHaveBeenCalled();
  });
});
 
