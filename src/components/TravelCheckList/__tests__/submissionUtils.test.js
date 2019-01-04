import React from 'react';
import SubmissionUtils from '../SubmissionsUtils';
import tripRequest from '../../../mockData/checklistSubmissionMocks';

describe('SubmissionUtils Component', () => {
  let props = {
    airline: 'Kenya Airways',
    arrivalTime: '2019-07-02T12:00',
    checkId: 'QbSyCm5XIF-1',
    checklistItem: {
      deleteReason: null,
      destinationName: 'Deafult',
      id: 1,
      name: 'Travel Ticket Details',
      requiresFiles: false,
      resources: [
        {
          checklistItemId: 1,
          id: 1,
          label: 'Flight Application Guide',
          link: 'http://andela.com'
        },
      ],
      submissions: [
        {
          checklistItemId: 1,
          checklistSubmissions: {
            id: 1
          },
          createdAt: '2018-12-21T13:53:23.696Z',
          deletedAt: null,
          id: 'jbpZLrts-',
          tripId: 'QbSyCm5XIF',
          updatedAt: '2019-01-02T07:19:56.715Z',
          value: {
            airline: 'Kenya Airways',
            arrivalTime: '2019-07-02T12:00',
            departureTime: '2019-07-02T12:00',
            returnAirline: 'Kenya Airways',
            returnDepartureTime: '2019-07-02T12:00',
            returnTicketNumber: 'KQ12345',
            returnTime: '2019-07-02T12:00',
            ticketNumber: 'KQ5432'
          }
        },
      ],
    },
    departureTime: '2019-07-08T12:00',
    fileUploadData: {
      cloudinaryUrl: '',
      error: '',
      isUploading: '',
      uploadSuccess: 'QbSyCm5XIF-1',
    },
    handleInputChange: jest.fn(),
    handleTextAreaSubmit: jest.fn(),
    handleTicketSubmit: jest.fn(),
    handleUpload: jest.fn(),
    itemsToCheck: [
      'QbSyCm5XIF-1',
      'QbSyCm5XIF-1',
      'QbSyCm5XIF-1'
    ],
    postSuccess: [
      'QbSyCm5XIF-1'
    ],
    request: {...tripRequest},
    returnAirline: 'Kenya Airways',
    submissionText: '',
    ticketNumber: 'KQ123456',
    returnTicketNumber: 'KQ654321',
    setTextArea: jest.fn(),
    setTicketFields: jest.fn(),
    setUploadedFileName: jest.fn(),
    tripType: 'return',
    uploadedFileName: '',
    uploadProcess: 'success',
    trip: tripRequest.trips[0],
    utilsType: 'ticketFieldset'
  };
  const setup = (props) => mount(<SubmissionUtils {...props} />);

  it('should render the component', () => {
    const wrapper = setup(props);
    const ticketForm = wrapper.find('form');
    const ticketDetailsForm = wrapper.find('.travel-submission-details__return');

    expect(ticketForm.length).toBe(1);
    expect(ticketDetailsForm.length).toBe(2);
  });

  it('should initialize the dates based on the props', () => {
    const wrapper = setup(props);

    wrapper.setProps({returnTime: '2019-07-08T12:00'});
    expect(wrapper.state().returnTime).toEqual('2019-07-08T12:00');
  });

  it('should call the handleInputChange', () => {
    const wrapper = setup(props);
    const input = wrapper.find('input[name="departureTime"]');
    const event = {
      target: {
        value: 'foo',
        name: 'departureTime',
        type: 'datetime-local'
      }
    };
    input.simulate('change', event);
    expect(props.handleInputChange).toHaveBeenCalled();
  });

  it('should call the handleTicketSubmit', () => {
    const wrapper = setup(props);
    const input = wrapper.find('input[name="departureTime"]');
    const handleTicketSubmitSpy = jest
      .spyOn(wrapper.instance(), 'handleTicketSubmit');
    const event = {
      target: {
        value: 'foo',
      }
    };
    input.simulate('focus');
    input.simulate('change', event);
    input.simulate('blur');
    expect(handleTicketSubmitSpy).toHaveBeenCalled();
  });
});



