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
  user: {},
  editTravelReadinessDocument: jest.fn(),
  document: {},
  handleSubmit: jest.fn(),
  modalType: '',
  documentType: ''
};

const otherDocumentDefaultFormState  = {
  values: {
    name: '',
    dateOfIssue: '',
    expiryDate: '',
  },
  errors: {},
  hasBlankFields: true,
  documentUploaded: false,
  uploadingDocument: false,
  image: ''
};

const document = {
  country: 'USA',
  image : 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpeg'
};

const newOtherDocumentDefaultFormState  = {
  values: {
    name: 'emeka',
    dateOfIssue: '',
    expiryDate: '',
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: true,
  image: '',
};

const newOtherDocumentDefaultFormStateII  = {
  values: {
    name: 'emeka',
    dateOfIssue: '',
    expiryDate: '',
  },
  errors: {},
  hasBlankFields: true,
  uploadingDocument: false,
  documentUploaded: true,
  image: 'image.jpeg'
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
  uploadingDocument: false,
  documentUploaded: false,
  image: ''
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
  let createTravelReadinessDocument, editTravelReadinessDocument;
  createTravelReadinessDocument = jest.fn();
  editTravelReadinessDocument = jest.fn();

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
        modalType="add other"
      />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Add Document');
  });

  it('renders the edit other document modal', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm 
        {...props} 
        documentType="other" 
        defaultFormState={otherDocumentDefaultFormState}
        modalType="edit other"
      />
    );
    expect(
      wrapperWithOtherDocumentField.find(OtherDocumentFieldSet))
      .toHaveLength(1);
  });

  it('renders the edit other document modal with button text \'Save Changes\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm 
        {...props} 
        documentType="other" 
        defaultFormState={otherDocumentDefaultFormState}
        modalType="edit other"
      />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Save Changes');
  });

  it('renders visa  modal', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find(VisaFormFieldset))
      .toHaveLength(1);
  });

  it('renders edit visa  modal', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" modalType="edit visa" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find(VisaFormFieldset))
      .toHaveLength(1);
  });

  it('should upload a file', () => {
    wrapper.find('#select-file').simulate('change', event);
    expect(wrapper.state().image).toEqual(validFile);
  });

  it('should upload a file for edit', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa'
    };
    const wrapper = mount(<BaseForm {...newProps} />);
    wrapper.find('#select-file').simulate('change', event);
    expect(wrapper.state().image).toEqual(validFile);
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

  it('renders edit visa  modal with button text \'Save Changes\'', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" modalType="edit visa" defaultFormState={visaDefaultFormState} />
    );
    expect(
      wrapperWithOtherDocumentField.find('button#submit').text()).toEqual('Save Changes');
  });

  it('should call the handleSubmit method for document edits', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
      documentType: 'visa'
    }
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...newProps} defaultFormState={newOtherDocumentDefaultFormState} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleSubmit');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for document edits', () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
      documentType: 'visa'
    }
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...newProps} defaultFormState={newOtherDocumentDefaultFormStateII} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    jest.spyOn(instance, 'handleSubmit');
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for document addition', () => {
    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={newOtherDocumentDefaultFormState} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for editing visa', () => {
    const newProps = {
      ...props,
      document: {
        type: 'visa',
        data: {
          country: 'Naija',
          cloudinaryUrl: 'image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit visa',
    };

    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...newProps} defaultFormState={newOtherDocumentDefaultFormState} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should call the handleSubmit method for editing others', () => {
    const newProps = {
      ...props,
      document: {
        type: 'other',
        data: {
          name: 'other',
          documentId: '1234',
          cloudinaryUrl: 'image.jpg'
        }
      },
      currentDocument: {},
      handleSubmit: jest.fn(),
      modalType: 'edit other',
    };

    const wrapperWithOtherDocumentField = mount(
      <BaseForm {...newProps} defaultFormState={newOtherDocumentDefaultFormState} />
    );

    const instance = wrapperWithOtherDocumentField.instance();
    let documentUploaded = false;
    wrapperWithOtherDocumentField.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
  });

  it('should create visa if all the data is valid',  () => {
    const newProps = {
      ...props,
      modalType: 'add visa'
    };

    const wrapper = mount(<BaseForm {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);


    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('.travel-document-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(createTravelReadinessDocument).toHaveBeenCalledWith('visa', document);
    });
  });

  it('should edit visa if all the data is valid',  () => {
    const newProps = {
      ...props,
      modalType: 'edit visa',
      documrntType: 'visa',
    };

    const wrapper = mount(<BaseForm {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);


    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('.travel-document-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(editTravelReadinessDocument).toHaveBeenCalledWith('visa', document);
    });
  });

  it('should not upload an image for edit if it is already uploaded', () => {
    const newProps = {
      ...props,
      modalType: 'edit other',
      documrntType: 'other',
    };
    const wrapper = mount(<BaseForm {...newProps} />);
    wrapper.setState({values: {...document}});
    wrapper.find('#select-file').simulate('change', event);


    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.setState({documentUploaded: true});
    wrapper.find('.travel-document-form').simulate('submit');
    expect(props.editTravelReadinessDocument).toHaveBeenCalled();
  });

  it('should display an error when no value is input', () => {
    const formWrapper = mount(
      <BaseForm {...props} documentType="visa" defaultFormState={visaDefaultFormState} />
    );
    let documentUploaded = false;
    formWrapper.find('form').simulate('submit', {
      preventDefault: () => {
        documentUploaded = true;
      },
    });
    expect(documentUploaded).toBe(true);
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

  it('calls componentWillReveiveProps and update the state', () => {
    wrapper.setProps({
      ...props,
      values: {
        country: 'USA',
      },
    });
    expect(wrapper.instance().state.values.country).toBe('USA');
  });

  it('should toast an error if the visa file does not upload', () => {
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
});
