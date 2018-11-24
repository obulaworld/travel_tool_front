import React from 'react';
import { stub } from 'sinon';
import toast from 'toastr';
import NewDocumentForm from '..';

toast.error = jest.fn();

describe('<NewDocumentForm />', () => {
  let wrapper;
  const props = {
    user: {
      userId: 'getyHjk5',
    },
    createDocument: jest.fn,
    closeModal: jest.fn,
    onCancel: jest.fn,
  };

  const file = new Blob([{
    name: 'file.jpg',
    lastModified: 1517684494000,
    lastModifiedDate:
        'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)',
    webkitRelativePath: '',
    size: 212919,
    type: 'application/pdf'
  }], {type : 'application/pdf'});

  const invalidFileType = new Blob(['invalid file'], {type : 'text/plain'});

  beforeEach(() => {
    wrapper = mount(<NewDocumentForm {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the onClick prop when click is simulated', () => {
    const onCancel = jest.fn;
    wrapper.find('#cancel').simulate('click');
    expect(onCancel).toBeCalled;
  });

  it('should call the onChange prop when click is simulated', () => {
    const onChange = jest.fn;
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [
          file
        ]
      }
    };
    wrapper.find('#upload-btn').simulate('change', event);
    expect(onChange).toBeCalled;
  });

  it('should call onsubmit', () => {
    const onSubmit = stub()
      .withArgs('file', 'name');
    const uploadComponent = mount(<NewDocumentForm handleSubmit={onSubmit} /> );
    uploadComponent.simulate('submit');
    expect(onSubmit).toBeCalled;
  });

  it('shows a toaster if file type is invalid', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [
          invalidFileType
        ]
      }
    };
    wrapper.find('#upload-btn').simulate('change', event);
    expect(toast.error).toHaveBeenCalledWith('Incorrect file type uploaded');
  });

  describe('NewDocumentForm.validate', () => {
    it('validates filename', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'validate');
      expect(instance.validate).toBeCalled;
    });

    it('validates required field', () => {
      wrapper.instance().validate();
      expect(wrapper.state('errors')).toEqual({ name: 'This field is required' });
    });

    it('validates filename', () => {
      wrapper.state('values').name = '12filename'; // set name field value to string starting with digits
      wrapper.instance().validate();
      expect(wrapper.state('errors')).toEqual({
        name: 'File name must start with an alphabet'
      });
    });
  });

});
