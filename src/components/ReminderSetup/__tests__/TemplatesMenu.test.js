import React from 'react';
import { mount } from 'enzyme';
import TemplatesMenu from '../TemplatesMenu';

describe('<TemplatesMenu />', () => {
  const props = {
    disableEnable: false
  };
  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };
  it('renders without crashing', () => {
    const wrapper = mount(<TemplatesMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens menu container', () => {
    const wrapper = mount(<TemplatesMenu {...props} />);
    const toggleMenu = wrapper.find('#toggleIcon');
    expect(toggleMenu.length).toEqual(1);
    toggleMenu.simulate('click', event);
    expect(wrapper.state().openClose).toEqual('open');
    wrapper.unmount();
  });

  it('closes on click outside the component', () => {
    const wrapper = mount(<TemplatesMenu {...props} />);
    wrapper.simulate('mousedown');
    expect(wrapper.state().openClose).toEqual('');
  });
});
