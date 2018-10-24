import React from 'react';
import sinon from 'sinon';
import CheckBox from '../CheckBox';

describe('<CheckBox />', () => {
  const props = {
    name: '',
    onChange: jest.fn()
  };

  it('renders as expected', () => {
    const wrapper = shallow(<CheckBox {...props} />);
    expect(wrapper.length).toEqual(1);
  });

  it('handle onChnage function', () => {
    const wrapper = shallow(<CheckBox {...props} />);
    const event = {
      target: { checked: false },
    };
    wrapper.find('#checkbox').simulate('change', event);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
