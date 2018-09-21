import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import UserComments from '../UserComments';

const props = {
  comments: [
    {
      id: 1,
      userName: 'Smith Allen',
      picture: '/path/to/image',
      createdAt: '',
      comment: 'Can you clarify why'
    }
  ]
};

const formatDateSpy = sinon.spy(UserComments.prototype, 'formatDate');
describe('UserComments component', () => {
  const wrapper = shallow(<UserComments {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call formatDate', () => {
    expect(formatDateSpy.called).toBe(true);
  });

  it('should render the UserComments component as expected', () => {
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('ImageLink').length).toBe(1);
    expect(wrapper.find('button').length).toBe(0);
    expect(wrapper.length).toBe(1);
  });
});
