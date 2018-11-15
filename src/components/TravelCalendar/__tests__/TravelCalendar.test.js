import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import TravelCalendar from '../index';
import TravelCalendarDetails from '../../TravelCalendarDetails';

const props = {
  travelCalendar: {
    travelCalendarError: 'Error mew',
    travelCalendarData: {
    data: [{
      name: "Barrison Waina",
      department: "Apprenticeship Department",
      role: "Product designer",
      flights: {
        arrival: {
          destination: "Lagos",
          airline: "Kenya Airways",
          flight_no: "KQ5752",
          arrival_time: "24/10/2018 13:23:33",
          depature_time: "24/10/2018 13:23:33"
        },
        depature: {
          destination: "Nairobi",
          airline: "Kenya Airways",
          flight_no: "KQ5752",
          arrival_time: "24/10/2018 13:23:33",
          depature_time: "24/10/2018 13:23:33"
        }
      }
    }],
    pagination: {
      total: 30,
      current_page: 1,
      limit: 13,
      nextPage: 2,
      prevPage: null
    }
  }
  },
  fetchCalendarAnalytics: jest.fn(),
  downloadCalendarAnalytics: jest.fn(),
  handleFilterBtn: jest.fn()
};

const {fetchCalendarAnalytics,downloadCalendarAnalytics,travelCalendar} = props;
const wrapper = shallow(
  <TravelCalendar
    fetchCalendarAnalytics={fetchCalendarAnalytics}
    downloadCalendarAnalytics={downloadCalendarAnalytics}
    travelCalendar={travelCalendar}
  />);

describe('Travel Calendar', ()=>{
  it('should render Travel Calendar Correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('checks that handle change is invoked', () => {
    wrapper.instance().handleChange('This is a range');
    expect(props.fetchCalendarAnalytics).toHaveBeenCalled()
  });

  it('checks that calendar is rendered when button is clicked', () => {
    const btn = wrapper.find('.action-btn--calender');
    btn.simulate('click');
    expect(wrapper.state().isCalendarOpen).toBe(true)
  });

  it('checks that download method is called when button is clicked', () => {
    const btn = wrapper.find('.actions__btn');
    btn.simulate('click');
    expect(props.downloadCalendarAnalytics).toHaveBeenCalled()
  });

  it('checks that spinner is rendered when isLoading is true', () => {
    wrapper.setProps(travelCalendar.isLoading = true);
    const spinner = wrapper.find('.analyticsReport__report-details')
    expect(spinner.length).toBe(1)
  });
})
