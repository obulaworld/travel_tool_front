import React from 'react';
import { shallow, mount } from 'enzyme';
import AnalyticsReport from '../index';
import tripsPerMonthData from '../__mocks__/analyticsReportMockData';

const defaultProps = {
  departmentTrips: {
    report: tripsPerMonthData,
    loading: false,
  },
  fetchDepartmentTrips: jest.fn()
};

const setup = (props) => {
  const actualProps = props || defaultProps;
  return shallow(<AnalyticsReport {...actualProps} />);
};

describe('Test suite for Analytics Report Component', () => {
  it('should render the component properly', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should match the snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the loading spinner', () => {
    const newProps = { ...defaultProps };
    newProps.departmentTrips.loading = true;
    const wrapper = setup(newProps);
    const spinnerDiv = wrapper.find('.analyticsReport__spinner');
    expect(spinnerDiv.length).toBe(1);
  });

  it('should display no records found when there\'s no record', () => {
    const newProps = { ...defaultProps };
    newProps.departmentTrips.report = [];
    const wrapper = setup(newProps);
    const noRecordsDiv = wrapper.find('#no-records');
    expect(noRecordsDiv.length).toBe(1);
  });

  it('should call fetchDepartmentTrips when export button is clicked', () => {
    const wrapper = setup();
    const button = wrapper.find('#btnExportTripsPerMonth');
    button.simulate('click');
    expect(defaultProps.fetchDepartmentTrips).toHaveBeenCalled();
  });
});
