import toast from 'toastr';
import moxios from 'moxios';
import React from 'react';
import PassportForm from '../PassportForm';

toast.success = jest.fn();
toast.error = jest.fn();

describe('<PassportForm/>',  () => {

  let wrapper, createTravelReadinessDocument;
  createTravelReadinessDocument = jest.fn();

  const props = {
    createTravelReadinessDocument: jest.fn(),
    fetchingDocument: false,
    isLoading: false,
    document: {},
    errors: {},
    fetchUserData: jest.fn(),
    users: [],
    user: {},
    closeModal: jest.fn(),
    onCancel: jest.fn()
  };

  const document = {
    name: 'Mike',
    passportNumber : 'ABC123aemlbczy85',
    nationality : 'Kenyan ',
    dateOfBirth : '12-01-1998',
    dateOfIssue : '12-10-2018',
    placeOfIssue : 'Kenya',
    expiryDate : '11-11-2019',
    cloudinaryUrl : 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpeg'
  };


  const passportFile = new Blob(['Passport file'], {type: 'application/pdf', name: 'Filename.pdf'});

  const event = {
    target: {
      files: [
        passportFile
      ]
    }
  };

  beforeEach(() => {
    wrapper = mount(<PassportForm {...props} />);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should upload a file', () => {
    wrapper.find('#select-file').simulate('change', event);
    expect(wrapper.state().image).toEqual(passportFile);
  });

  it('should not submit without document', () => {
    wrapper.setState({values: {...document}});

    process.env.REACT_APP_CLOUNDINARY_API = 'https://mock-passport-cloudinary-api-succeed';

    const cloudinaryResponse = {
      url: 'secure url'
    };

    moxios.stubRequest(process.env.REACT_APP_CLOUNDINARY_API, {
      status: 200,
      response: cloudinaryResponse
    });

    wrapper.find('.passport-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeFalsy();
      expect(toast.error).toHaveBeenCalledWith('Please upload a passport.');
    });
  });

  it('should submit if all the data is valid',  () => {
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

    wrapper.find('.passport-form').simulate('submit');

    moxios.wait(() => {
      expect(wrapper.state().documentUploaded).toBeTruthy();
      expect(createTravelReadinessDocument).toHaveBeenCalledWith('passport', document);
    });
  });

  it('should not upload an image if it is already uploaded', () => {
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
    wrapper.find('.passport-form').simulate('submit');
    expect(props.createTravelReadinessDocument).toHaveBeenCalled();
  });

  it('should display errors when received from the api', () => {
    wrapper.setProps({ errors: { cloudinaryUrl: 'Please provide a passport'}});
    expect(wrapper.state().errors).toEqual({cloudinaryUrl: 'Please provide a passport'});
  });

  it('should toast an error if the passport file does not upload', () => {
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
    wrapper.find('.passport-form').simulate('submit');
    expect(toast.error).toHaveBeenCalledTimes(0);
  });

});
