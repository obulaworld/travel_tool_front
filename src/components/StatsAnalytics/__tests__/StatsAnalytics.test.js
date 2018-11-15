import React from 'react';
import { shallow } from 'enzyme';
import StatsAnalytics from '..';

const props = {
  color: '#000',
  stats: 40,
  icon: 'sfdhd.d'
};

describe('<Dashboard />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<StatsAnalytics {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
