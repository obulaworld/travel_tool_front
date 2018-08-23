import React from 'react';
import Input from '..';

describe('<Input />', () => {
  let wrapper;

  beforeEach(() => {
    const contextObject = {
      context: {
        errors: {fullname: 'This field is required'},
        targetForm: {
          validate: ()=>{}
        }
      }
    };

    wrapper = mount(
      <Input
        name="fullname"
        type="text"
        onChange={()=>{}}
        label="Test label"
      />, contextObject
    );
  });


  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Displays the error messge', () => {
    const errorText = wrapper.find('span.error').text();
    expect(errorText).toBe('This field is required');
  });

});
