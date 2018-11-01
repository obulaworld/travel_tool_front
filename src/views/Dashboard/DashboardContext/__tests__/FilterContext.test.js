import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import FilterContext from '../FilterContext';

describe('<FilterContext />', () => {
  const wrapper = shallow(<FilterContext />);

  it('should render without crushing', () => {
    const wrapper = shallow(<FilterContext />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with today\'s filter', () => {
    wrapper.instance().handleFilter('Today');
    const date = moment().format('YYYY-MM-DD');
    expect(wrapper.state().filter).toBe('Today');
    expect(wrapper.state().range.start).toBe(date);
    expect(wrapper.state().range.end).toBe(date);
  });

  it('should update state with tomorrow\'s filter', () => {
    wrapper.instance().handleFilter('Tomorrow');
    const date = moment(new Date()).add(1,'days').format('YYYY-MM-DD');
    expect(wrapper.state().filter).toBe('Tomorrow');
    expect(wrapper.state().range.start).toBe(date);
    expect(wrapper.state().range.end).toBe(date);
  });

  it('should update state with this month\'s filter', () => {
    wrapper.instance().handleFilter('This Month');
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
    expect(wrapper.state().filter).toBe('This Month');
    expect(wrapper.state().range.start).toBe(start);
    expect(wrapper.state().range.end).toBe(end);
  });

  it('should update state with this week\'s filter', () => {
    wrapper.instance().handleFilter('This Week');
    const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const end = moment().endOf('isoWeek').format('YYYY-MM-DD');
    expect(wrapper.state().filter).toBe('This Week');
    expect(wrapper.state().range.start).toBe(start);
    expect(wrapper.state().range.end).toBe(end);
  });

});