import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from '../UserInfo';
import requestData from '../../__mocks__/requestData';

const props = {
  user: {
    picture: 'http://my-image'
  },
  requestData,
};

describe('UserComments component', () => {
  const wrapper = shallow(<UserInfo {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the UserComments component as expected', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('ImageLink').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
