import React from 'react';
import ReadinessPanelHeader from '../ReadinessPanelHeader';

const props = {
  openModal: jest.fn()
};
describe('<ReadinessPanelHeader />', () => {
  const wrapper = mount(
    <ReadinessPanelHeader {...props} />
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls open modal', () => {
    expect(wrapper.find('.action-btn').length).toEqual(1);
    wrapper.find('.action-btn').simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });
});
