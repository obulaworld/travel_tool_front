import React from 'react';
import { mount, shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import CheckListSubmissionForm from '../CheckListSubmissionForm';
import { travelChecklists, mockRequest  } from '../travelChecklistMockData';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  submissions:{
    submissions:[{
      'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld","fileName":"airticket.pdf"}',
      'tripId': '35678',
      'checklistItemId': 7,
      'id': 'St1pYTwhT',
      'updatedAt': '2018-10-22T06:59:12.056Z',
      'createdAt': '2018-10-22T06:59:12.056Z',
      'deletedAt': null
    }],
    successStatus: true
  },
  requests: {
    requests: [mockRequest]
  }});

store.runSagas = sagaMiddleware.run;

let wrapper;
let props = {
  item: {'id': 1,
    'name': 'Visa Application',
    'resources': [{
      'checklistItemId': 1,
      'id':2,
      'label': 'Application guide',
      'link': 'https://google.com/application-guide'
    },
    ],
    'requiresFiles': true,
    'deleteReason': null,
  },
  submissionInfo:{
    submissions:[{
      'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld","fileName":"airticket.pdf"}',
      'tripId': '35678',
      'checklistItemId': 7,
      'id': 'St1pYTwhT',
      'updatedAt': '2018-10-22T06:59:12.056Z',
      'createdAt': '2018-10-22T06:59:12.056Z',
      'deletedAt': null
    }],
    successStatus: true
  },
  checklistsData: travelChecklists,
  requestId: 'hg3456yh',
  requests: [mockRequest],
  requestData: mockRequest,
  handleSubmit: jest.fn(),
  handleUpload: jest.fn(),
  fetchSubmission: jest.fn(),
  postSubmission: jest.fn(),
  isLoading: false
};

jest.useFakeTimers();

describe('<CheckListSubmissionFormSets />', () => {
  const setsProps = {  
    submissionInfo: {
      submissions: [{
        'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld","fileName":"airticket.pdf"}',
        'tripId': '35678',
        'checklistItemId': 'null',
        'id': 'St1pYTwhT',
        'updatedAt': '2018-10-22T06:59:12.056Z',
        'createdAt': '2018-10-22T06:59:12.056Z',
        'deletedAt': null
      }],
      successStatus: true
    }, item: {'id': 1,
      'name': 'Visa Application',
      'resources': [{
        'checklistItemId': 1,
        'id':2,
        'label': 'Application guide',
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles': true,
      'deleteReason': null,
    },
    trips: [
      {id: '35678',
        name: 'travel',
        tripType: 'oneWay',
        manager: 'Matthew Wacha',
        gender: 'Male',
        picture: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png',
        role: 'Software Developer',
        status: 'Approved',
        origin: 'Nairobi, Kenya',
        destination: 'Kampala, Uganda',
        requestId: '35678',
      },
      {id: '356785',
        name: 'travel',
        tripType: 'return',
        manager: 'Matthew Wacha',
        gender: 'Male',
        picture: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png',
        role: 'Software Developer',
        status: 'Approved',
        origin: 'Nairobi, Kenya',
        destination: 'Kampala, Uganda',
        requestId: '356785',
      }
    ]};
  const postSubmission = jest.fn();

  it('should render correctly', () => {
    wrapper = shallow(
      <CheckListSubmissionForm {...props} store={store} trips={[]} />);
    expect(wrapper.find('div.travelCheckList__destination-name').length).toBe(2);
  });

  it('should handle submit', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'airline',
        value: 'Kenya Airways',
        id: 'airline-name multi'
      }};
    const state = {
        ticket : 'KG 435K',
        arrivalTime : '10:00'
      },
      wrapper = mount(
        <CheckListSubmissionForm store={store} {...props} trips={[]} postSubmission={postSubmission} />);
    wrapper.setProps(setsProps);
    wrapper.setState(state);
    wrapper.find('input[name="airline"]').first().simulate('change', event);
    wrapper.find('input[name="airline"]').first().simulate('change', event);
    jest.runAllTimers();
    expect(wrapper.state().ticket).toBe('KG 435K');

  });

  it('should handle submit for return trip', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'airline',
        value: 'Kenya Airways',
        id: 'airline-name return'
      }};
    const state = {
        ticket : 'KG 435K',
        arrivalTime : '10:00',
        returnFlightNumber: 'KRT 435K',
        returnAirline: 'Kenya Airways',
        returnArrivalTime: '23:00'
      },
      wrapper = mount(
        <CheckListSubmissionForm store={store} {...props} postSubmission={postSubmission} />);
    wrapper.setProps(setsProps);
    wrapper.setState(state);
    wrapper.find('input[name="airline"]').first().simulate('change', event);
    wrapper.find('input[name="airline"]').first().simulate('change', event);
    jest.runAllTimers();
    expect(wrapper.state().airline).toBe('Kenya Airways');
  });
});
