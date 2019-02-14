import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import AddVisaForm from '../AddVisaForm';


const props = {
  errors: {},
  createTravelReadinessDocument: jest.fn(),
  closeModal: jest.fn(),
  fetchUserData: jest.fn(),
  user: {}
};

const textFile = new Blob(['This is a text file'], {type : 'text/plain'});
textFile.name = 'textFile.txt';

const validFile = new Blob(['This is a valid png file'], {type : 'image/png', size: 1092});
validFile.name = 'filenamewhichistoolongibetyoucantreadthiscozitsgreaterthan50characters.png';

toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
  target:{
    files: [validFile]
  }
};

describe('<AddVisaForm />', () => {
  const wrapper = mount(<AddVisaForm {...props} />);
  process.env.REACT_APP_CLOUNDINARY_API = 'https://api.cloudinary.com/v1_1/skybound/image/upload';
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    toast.error.mockReset();
  });
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders file selector', () => {
    wrapper.find('.travel-document-select-file');
    expect(wrapper.find('.travel-document-select-file').length).toEqual(1);
  });

  it('handles submit', () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API, 
      { status: 200, data: { url: 'url' } }
    );
    wrapper.state().file = validFile;
    wrapper.setProps({document: {data: { imageName: 'image.jpg' }}});
    wrapper.find('.travel-document-form').simulate('submit', event);
    moxios.wait(() => {
      expect(props.createTravelReadinessDocument).toHaveBeenCalled();
    });
  });

  it('changes state accordingly',  () => {
    moxios.stubRequest(
      process.env.REACT_APP_CLOUNDINARY_API, 
      { status: 200, data: { url: 'url' } }
    );
    wrapper.find('#select-file').simulate('change', event);
    moxios.wait(() => {
      expect(wrapper.state().cloudinaryUrl).toEqual();
    });
  });

  it('toasts an error if file is invalid', () => {
    event.target.files = [textFile];
    wrapper.find('#select-file').simulate('change', event);
    expect(toast.error).toHaveBeenCalled();
  });

  it('toasts an error if cloudinary returns an error', () => {
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500});
    wrapper.find('#select-file').simulate('change', event);
  });

  it('closes modal on cancel', () => {
    expect(wrapper.find('#cancel').length).toEqual(1);
    wrapper.find('#cancel').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

});
