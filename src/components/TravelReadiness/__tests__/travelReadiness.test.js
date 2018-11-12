import React from 'react';
import { shallow, mount } from 'enzyme';
import TravelReadiness  from '../index';
import travelReadinessData from '../__mocks__/travelReadinessMockData';

const defaultProps = {
  readiness: {
    response: travelReadinessData,
    isLoading: false,
    readiness: [{
      departureDate: '2018-10-04',
      request: {
        name: 'Lazuli Doe'
      },
      travelReadiness: '0% complete',
      arrivalDate: '2018-10-05T00:00:00.000Z'
    }],
  },
  fetchReadiness: jest.fn(),
  renderButton: jest.fn(),
  departmentTrips: {
    report: ''
  },
  fetchDepartmentTrips: jest.fn(),
  exportReadiness: jest.fn(),
  renderNotFound: jest.fn(),
  renderSpinner: jest.fn()

};
const setup = (props) => {
  const actualProps = props || defaultProps;
  return shallow(<TravelReadiness {...actualProps} />);
};
describe('Test suite for Travel Readiness Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = setup();
  });

  it('should render the component properly', () => {
    const analyticsReport = wrapper.find('.analyticsReport__row');
    expect(wrapper.length).toBe(1);
    expect(analyticsReport.length).toBe(3);
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render NotFound when there are ro records to display', () => {
    const newProps = {...defaultProps };
    newProps.readiness.readiness = [];
    const newWrapper = setup(newProps);
    expect(newProps.renderNotFound).toHaveBeenCalled();
  });
  it('should render Spinner when generating a report', () => {
    const newProps = {...defaultProps }; 
    newProps.readiness.isLoading = true;
    const newWrapper = setup(newProps);
    expect(newProps.renderSpinner).toHaveBeenCalled();
  });
  it('should call export readiness action when export button is clicked', () => {
    const newWrapper = mount(<TravelReadiness {...defaultProps} />);
    const exportBtn = newWrapper.find('#btnExportReadinessCSV').first();
    exportBtn.simulate('click');
    expect(defaultProps.exportReadiness).toHaveBeenCalled();
  });
});
