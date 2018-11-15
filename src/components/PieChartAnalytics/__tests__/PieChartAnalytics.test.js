import React from 'react';
import { shallow } from 'enzyme';
import PieChartAnalytics, { renderCustomizedLabel } from '..';

const props = {
  data: []
};

describe('<Dashboard />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PieChartAnalytics {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render customized label correctly', () => {
    const label = renderCustomizedLabel({ cx: 2, cy: 3, midAngle: 4, innerRadius: 3, outerRadius: 7, percent: 0.23, name: 'hello'});
    expect(label).toMatchSnapshot();
  });
});
