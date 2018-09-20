import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../index';

describe('<Checkbox />', ()=> {
  it('should render correctly', () =>{
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change class when the checkbox is clicked', () =>{
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Checkbox onClick={mockOnClick} />);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);
  });

  it('should change state  when the checkbox is clicked twice', () =>{
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Checkbox onClick={mockOnClick} />);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(false);
  });
});
