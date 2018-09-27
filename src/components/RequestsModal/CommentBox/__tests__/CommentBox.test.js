import React from 'react';
import { shallow } from 'enzyme';
import { CommentBox } from '../CommentBox';

describe('Render CommentBox component', () => {
  
  const props = {
    createComment: jest.fn(),
    handleEditComment: jest.fn(),
    editComment:  jest.fn(),
    handleNoEdit:  jest.fn(),
    handleSubmit:()=>{},
  };
  const event = {
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
    expect(event.target.editorContainer.style.border).toBe(border);
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
    const event = {
      target: {
        innerText: 'We are travelling',
        innerHtml: 'We are travelling'
      }
    };
    const wrapper = mount(<CommentBox {...props} />);
    let { dataInput } = wrapper.instance().state;
    expect(dataInput).toEqual('<p style="color:#999999; font-size: 16px;	font-family: DIN Pro;	line-height: 20px; text-align: left; margin: 20px;">Write a comment</p>');
    wrapper.instance().handleKeyUp(event);

    dataInput = wrapper.instance().state.dataInput;
    expect(dataInput).toEqual('We are travelling');

    event.target.innerText = '';
    wrapper.instance().handleKeyUp(event);
    dataInput = wrapper.instance().state.dataInput;
    expect(dataInput).toEqual('');

  });
  
  it('it should handle onfocus as expected', () => {
    const spy = handles('handleFocus');
    wrapperInstance.handleFocus(event);
    exepectCall(spy, '1px solid blue');
  });

  it('it should handle onblur as expected', () => {
    const spy = handles('handleBlur');
    wrapperInstance.handleBlur(event);
    exepectCall(spy, '1px solid #E4E4E4');
  });

  it('should not submit if state is empty', () => {
    const event = {
      preventDefault: () => jest.fn()
    };
    const wrapper = mount(<CommentBox {...props} />);
    const button = wrapper.find('#post-submit').at(0);
    button.simulate('click');
    expect(wrapper.props().createComment).toHaveBeenCalledTimes(0);
  });

  it('should submit comment', () => {
    const event = {
      preventDefault: () => jest.fn()
    };
    const wrapper = mount(<CommentBox {...props} />);
    wrapper.state().dataInput = 'comment';
    const button = wrapper.find('#post-submit').at(0);
    button.simulate('click');
    expect(wrapper.props().createComment).toHaveBeenCalledTimes(1);
  });

  it('should handle handleEditorChange', () => {
    const spy = handles('handleEditorChange');
    wrapperInstance.handleEditorChange('this is a test comment');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should submit edited comment', () => {
    const event = {
      preventDefault: () => jest.fn()
    };
    const wrapper = mount(<CommentBox {...props} />);
    wrapper.setProps({
      comment: 'Can you clarify why'
    });
    wrapper.setState({submitReady: true})
    const button = wrapper.find('.edit-buttons');
    button.simulate('click');
    expect(wrapper.props().editComment).toHaveBeenCalledTimes(1);
  });

  it('should handle submit when comment has not been edited', () => {
    localStorage.setItem('comment', 'Can you clarify why');
    const event = {
      preventDefault: () => jest.fn()
    };
    const wrapper = mount(<CommentBox {...props} />);
    wrapper.setProps({
      comment: 'Can you clarify why'
    });
    wrapper.setState({submitReady: true, dataInput: 'Can you clarify why'});
    const button = wrapper.find('.edit-buttons');
    button.simulate('click');
    expect(wrapper.props().handleNoEdit).toHaveBeenCalledTimes(1);
    localStorage.removeItem('comment');
  });
});
