import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Checkbox from '../index';

describe('<Checkbox />', ()=> {
  it('should render correctly', () =>{
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change class when the checkbox is unclicked', () =>{
    const mockOnClick = jest.fn();
    const state = {
      checkBox: 'clicked'
    };
    const wrapper = shallow(<Checkbox onClick={mockOnClick} state={state} />);
    const spy = sinon.spy(wrapper.instance(), 'clickCheckbox');
    wrapper.find('.checkbox').simulate('click');
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('.default').exists()).toBe(true);
  });

  it('should change class when the checkbox is clicked', () =>{
    const mockOnClick = jest.fn();
    const state = {
      checkBox: 'notClicked'
    };
    const wrapper = shallow(<Checkbox onClick={mockOnClick} state={state} />);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);

  });

  it('should assign cached checkbox state to checkbox', () =>{
    const wrapper = shallow(<Checkbox />);
    expect(wrapper.find('.clicked').exists()).toBe(true);
  });

  it('should change state  when the checkbox is clicked twice', () =>{
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Checkbox onClick={mockOnClick} />);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.notClicked').exists()).toBe(false);
  });
});
