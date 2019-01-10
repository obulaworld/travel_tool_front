import React from 'react';
import { shallow } from 'enzyme';
import DataRow from '../index';

const props = {
  item: {
    id: 'f4wevad',
    destination: 'Nairobi',
    duration: '3 days',
    status: 'Verified'
  }
};

describe('<DataRow />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DataRow {...props} />);
    expect(wrapper.find('.data-row').length).toBe(1);
  });
});
