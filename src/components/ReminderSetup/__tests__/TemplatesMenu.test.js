import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import TemplatesMenu from '../TemplatesMenu';

describe('<TemplatesMenu />', () => {
  const state = {
    openClose: ''
  };
  const props = {
    disableEnable: false,
    setItemToDisable: jest.fn(),
    id: 1,
    template: {
      id: 'work'
    },
    reminder:{
      id: 'please'
    },
    history: {
      push: jest.fn()
    }
  };
  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(<MemoryRouter><TemplatesMenu {...props} /></MemoryRouter>);
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

  it('redirects on clicking edit on elipsis ', () => {
    const wrapper = mount(<TemplatesMenu {...props} />);
    const edit = wrapper.find('.edit').first();
    expect(edit.length).toEqual(1);
    edit.simulate('click', event);
    expect(props.history.push).toHaveBeenCalled();
  });
});
