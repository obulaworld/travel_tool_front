import React from 'react';
import { shallow } from 'enzyme';
import CommentBox from '../CommentBox';

// describe what we are testing
describe('Render RequestsModal component', () => {
  

  const props = {
    handleCreateComment:()=>{},
    handleSubmit:()=>{}
  };
  const e = {
    target: {
      editorContainer: {
        style: {
          border: ''
        }
      }
    }
  };
  const wrapper = mount(<CommentBox {...props} />);
  const wrapperInstance = wrapper.instance();

  const handles=(handle)=>{
    const spy = jest.spyOn(wrapper.instance(), handle);
    expect(spy).toHaveBeenCalledTimes(0);
    return spy;
  };
  
  const exepectCall =(spy, border) =>{
    expect(e.target.editorContainer.style.border).toBe(border);
    expect(spy).toHaveBeenCalledTimes(1);
  };
  
  // make our assertions and what we expect to happen
  
  it('should match snapshot', () => {
    const wrapper = shallow(<CommentBox {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the RequestsModal as expected', () => {
    const wrapper = shallow(<CommentBox {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('it should return comment box content as expected', () => {
    const e = {
      preventDefault: ()=>{},
      target: {
        getContent: () => 'We are travelling'
      }
    };
    const wrapper = mount(<CommentBox {...props} />);
    let { dataInput } = wrapper.instance().state;
    expect(dataInput).toEqual('');
    wrapper.instance().handleEditorChange(e);

    dataInput = wrapper.instance().state.dataInput;
    expect(dataInput).toEqual('We are travelling');
  });
  
  it('it should handle onfocus as expected', () => {
    const spy = handles('handleFocus');
    wrapperInstance.handleFocus(e);
    exepectCall(spy, '1px solid blue');
  });

  it('it should handle onblur as expected', () => {
    const spy = handles('handleBlur');
    wrapperInstance.handleBlur(e);
    exepectCall(spy, '1px solid #E4E4E4');
  });

  it('should render the onSubmit button works as exepected', () => {
    const wrapper = mount(<CommentBox {...props} />);
    let form = wrapper.find('#form-id');
    form.simulate('submit');
    expect(form).toMatchSnapshot();
  });
});
