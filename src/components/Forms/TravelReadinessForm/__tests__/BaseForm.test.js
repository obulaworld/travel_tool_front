import React from 'react';
import toast from 'toastr';
import moxios from 'moxios';
import BaseForm from '../BaseForm';
import VisaFormFieldset from '../FormFieldsets/VisaFormFieldset';
import OtherDocumentFieldSet from '../FormFieldsets/OtherDocumentFieldSet';



const props = {
  errors: {},
  createTravelReadinessDocument: jest.fn(),
  closeModal: jest.fn(),
  fetchUserData: jest.fn(),
  user: {}
};

const otherDocumentDefaultFormState  = {
  values: {
    name: '',
    dateOfIssue: '',
    expiryDate: '',
  },
  errors: {},
  hasBlankFields: true,
  isSubmitting: false,
  uploadProgress: 0,
  cloudinaryUrl: ''
};

const visaDefaultFormState  = {
  values: {
    name: '',
    dateOfIssue: '',
    expiryDate: '',
  },
  value: {
    name: '',
    dateOfIssue: '',
    expiryDate: '',
  },
  errors: {},
  hasBlankFields: true,
  isSubmitting: false,
  uploadProgress: 0,
  cloudinaryUrl: ''
};

const textFile = new Blob(['This is a text file'], {type : 'text/plain'});
textFile.name = 'textFile.txt';

const validFile = new Blob(['This is a valid png file'], {type : 'image/png', size: 1092});
validFile.name = 'file.png';

toast.error = jest.fn();
const event = {
  preventDefault: jest.fn(),
  target:{
    files: [validFile]
  }
};

describe('<OtherDocumentForm />', () => {
  const wrapper = mount(
    <BaseForm {...props} documentType="other" defaultFormState={otherDocumentDefaultFormState} />
  );
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

  it('renders other document modal', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm
        {...props}
        documentType="other"
        defaultFormState={otherDocumentDefaultFormState}
      />
    );
    expect(
      wrapperWithOtherDocumentField.find(OtherDocumentFieldSet))
      .toHaveLength(1);
  });

  it('renders other document modal with button text \'Add Document\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm
        {...props}
        documentType="other"
        defaultFormState={otherDocumentDefaultFormState}
      />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Document');
  });

  it('renders visa  modal', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find(VisaFormFieldset))
      .toHaveLength(1);
  });

  it('toasts an error if cloudinary returns an error', () => {
    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, { status: 500});
    wrapper.find('#select-file').simulate('change', event);
  });

  it('renders visa  modal with button text \'Add Visa\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Visa');
  });

  it('renders visa  default value \'Add\' on the button', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="none" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add ');
  });

  it('should display an error when no value is input', () => {
    const formWrapper = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={visaDefaultFormState} />
    );
    let isSubmitted = false;
    formWrapper.find('form').simulate('submit', {
      preventDefault: () => {
        isSubmitted = true;
      },
    });
    expect(isSubmitted).toBe(true);
  });

  it('should toast an error if the document file does not upload', () => {
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 404,
      response: cloudinaryResponse
    });

    wrapper.setState({documentUploaded: false});
    wrapper.find('.travel-document-form').simulate('submit');
    expect(toast.error).toHaveBeenCalledTimes(0);
  });

  it('should display errors when received from the api', () => {
    wrapper.setProps({ errors: { cloudinaryUrl: 'Please provide a document'}});
    expect(wrapper.state().errors).toEqual({cloudinaryUrl: 'Please provide a document'});
  });
});
