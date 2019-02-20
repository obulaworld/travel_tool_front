import React from 'react';
import FilterContext from '../FilterContext';

const props = {
  children: [],
  user: {
    location: 'Lagos, Nigeria'
  }
};

describe('<FilterContext />', () => {
  const wrapper = shallow(<FilterContext {...props} />);
  it('should render without crashing', () => {
    localStorage.setItem('location', 'Nairobi, Kenya');
    wrapper.instance().setState = jest.fn();
    const input = {start: '2018-12-02', end: '2018-12-10'};
    wrapper.instance().handleFilter(input);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().setState).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().setState).toHaveBeenCalledWith({ range: input});
    localStorage.clear();
  });
  it('should use the user`s location if location is not in Localstorage', () => {
    expect(wrapper.state('city')).toEqual('Lagos');
  });
});
