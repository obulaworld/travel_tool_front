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
      comment: 'Can you clarify why',
      isEdited: true,
      userEmail: 'gdgdgdgdg'
    }
  ],
  email: 'gdgdgdgdg'
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
    expect(wrapper.find('span').length).toBe(4);
    expect(wrapper.find('ImageLink').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.length).toBe(1);
  });

  it('should handle reset editing', () => {
    const wrapper = shallow(<UserComments {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'resetEditing');
    wrapper.instance().resetEditing();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleCancel', () => {
    const wrapper = shallow(<UserComments {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleCancelClick');
    const fakeEvent = { preventDefault: () => {} };
    wrapper.setState({
      commentToEdit: 'Can you clarify why'
    });
    const cancelButton = wrapper.find('#cancel-button');
    cancelButton.simulate('click', fakeEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should submit edited comment', () => {
    const wrapper = shallow(<UserComments {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'editComment');
    wrapper.state().dataInput = 'comment';
    const editButton = wrapper.find('#edited').at(0);
    editButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
