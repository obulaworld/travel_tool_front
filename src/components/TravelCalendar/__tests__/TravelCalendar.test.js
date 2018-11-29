import React from 'react';
import {startOfWeek, endOfWeek, format} from 'date-fns';
import { shallow, mount } from 'enzyme';
import TravelCalendar from '../index';

const props = {
  travelCalendar: {
    travelCalendarError: 'Error mew',
    travelCalendarData: {
      data: [{
        name: 'Barrison Waina',
        department: 'Apprenticeship Department',
        role: 'Product designer',
        picture: '',
        flight: {
          arrival: {
            destination: 'Lagos',
            airline: 'Kenya Airways',
            flightNo: 'KQ5752',
            arrivalTime: '24/10/2018 13:23:33',
            departureTime: '24/10/2018 13:23:33'
          },
          departure: {
            destination: 'Nairobi',
            airline: 'Kenya Airways',
            flightNo: 'KQ5752',
            arrivalTime: '24/10/2018 13:23:33',
            departureTime: '24/10/2018 13:23:33'
          }
        }
      }],
      pagination: {
        pageCount: 2,
        currentPage: 1,
        dataCount: 5,
        limit: 3,
        nextPage: 2,
        prevPage: 0
      }
    }
  },
  fetchCalendarAnalytics: jest.fn(),
  downloadCalendarAnalytics: jest.fn(),
  handleFilterBtn: jest.fn()
};

const filter = `dateFrom=${format(startOfWeek(new Date()), 'YYYY-MM-DD')}&dateTo=${format(endOfWeek(new Date()), 'YYYY-MM-DD')}`

const wrapper = shallow(
  <TravelCalendar {...props} />
);

describe('Travel Calendar', ()=>{
  it('should render Travel Calendar Correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('checks that handle change is invoked', () => {
    wrapper.instance().handleChange('This is a range');
    expect(props.fetchCalendarAnalytics).toHaveBeenCalled();
  });

  it('checks that calendar is rendered when button is clicked', () => {
    const btn = wrapper.find('.action-btn--calender');
    btn.simulate('click');
    expect(wrapper.state().isCalendarOpen).toBe(true);
  });

  it('checks that download method is called when button is clicked', () => {
    const btn = wrapper.find('.actions__btn');
    btn.simulate('click');
    expect(props.downloadCalendarAnalytics).toHaveBeenCalled();
  });

  describe('test handlePagination', () => {
    const wrapper = mount(
      <TravelCalendar {...props} />
    );
    it('should have state remain the same when prevState is 0', () => {
      wrapper.find('#Previous').simulate('click');
      expect(props.fetchCalendarAnalytics).toHaveBeenCalledWith({type: 'json', filter, page: 1});
      expect(wrapper.state().page).toEqual(1);
    });
    it('should change page in state to nextPage', () => {
      wrapper.find('#Next').simulate('click');
      expect(props.fetchCalendarAnalytics).toHaveBeenCalledWith({type: 'json', filter, page: 2});
      expect(wrapper.state().page).toEqual(2);
    });
    it('should change page in state to prevPage', () => {
      props.travelCalendar.travelCalendarData.pagination.prevPage = 1;
      wrapper.find('#Previous').simulate('click');
      const wrap = shallow(<TravelCalendar {...props} />)
      expect(props.fetchCalendarAnalytics).toHaveBeenCalledWith({type: 'json', filter, page: 1});
      expect(wrap.state().page).toEqual(1);
    });
  });
});
