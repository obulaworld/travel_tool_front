import React from 'react';
import { shallow } from 'enzyme';
import RequestInfo from '../RequestInfo';
import requestData from '../../__mocks__/requestData';

const props = {
  requestData,
};

describe('UserComments component', () => {
  const wrapper = shallow(<RequestInfo {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the UserComments component as expected', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('TravelLink').length).toBe(3);
    expect(wrapper.length).toBe(1);
  });
});
