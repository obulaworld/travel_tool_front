import React from 'react';
import { mount} from 'enzyme';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import WithLoadingSubmissionForm from '../SubmissionFormSets';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  submissions: {
    submissions:[{
      'value': '{"url":"http://res.cloudinary.com/travela/\
      raw/upload/v1540191551/w26o4c86mw4047ttwfld",\
      "secureUrl":"https://res.cloudinary.com/travela/raw/upload/\
      v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld",\
      "fileName":"airticket.pdf"}',
      'tripId': '35678',
      'checklistItemId': 1,
      'id': 'St1pYTwhT',
      'updatedAt': '2018-10-22T06:59:12.056Z',
      'createdAt': '2018-10-22T06:59:12.056Z',
      'deletedAt': null
    }],
    successStatus: true
  }});

store.runSagas = sagaMiddleware.run;

let wrapper;
let props = {
  item: {'id': '1',
    'name': 'Visa Application',
    'resources': [{
      'checklistItemId': '1',
      'id':2,
      'label': 'Application guide',
      'link': 'https://google.com/application-guide'
    },
    ],
    'requiresFiles': true,
    'deleteReason': null,
  },submissionInfo: {
    submissions:[{
      'value': '{"url":"http://res.cloudinary.com/travela/\
      raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":\
      "https://res.cloudinary.com/travela/raw/upload/v1540191551/\
      w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld",\
      "fileName":"airticket.pdf"}',
      'tripId': '35678',
      'checklistItemId': '1',
      'id': 'St1pYTwhT',
      'updatedAt': '2018-10-22T06:59:12.056Z',
      'createdAt': '2018-10-22T06:59:12.056Z',
      'deletedAt': null
    }],
    successStatus: true
  },
  trips: [
    {id: '35678',
      name: 'travel',
      tripType: 'oneWay',
      manager: 'Matthew Wacha',
      gender: 'Male',
      picture: 'https://upload.wikimedia.org/wikipedia/en/\
      b/b1/Portrait_placeholder.png',
      role: 'Software Developer',
      status: 'Approved',
      origin: 'Nairobi, Kenya',
      destination: 'Kampala, Uganda',
      requestId: '35678',
    }
  ],
  destination: 'Kampala, Uganda',
  handleSubmit: jest.fn(),
  handleUpload: jest.fn(),
  postSubmission: jest.fn()
};

class FilerMock {
  constructor(){
    this.result;
  }
  readAsDataURL = (file) => {
    this.result = 'DATA:URL';
  }
   onload = () => {
     const event = {
       target: {
         result: this.result
       }
     };
     addEventListener('string', this.result);
     return event;
   }
}
global.FileReader = FilerMock;

axios.get = (url) => { return 'response'; };
describe('<WithLoadingSubmissionForm />', () => {
  it('should render correctly', () => {
    wrapper = mount(
      <WithLoadingSubmissionForm store={store} {...props} />);
    expect(wrapper.find('div.travelCheckList--item__item').length).toBe(1);
  });
});

describe('handle uploads', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }],
      result: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }]
    }
  };

  it('should handle upload', () => {
    wrapper = mount(
      <Provider store={store}>
        <WithLoadingSubmissionForm {...props} />
      </Provider>);
    wrapper.find('input[name="file"]').simulate('change', event);
    expect(wrapper.find('input[name="file"]').length).toBe(1);

  });

});

describe('handle downloads', () => {
  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }],
      result: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }]
    }
  };
  beforeEach( () => {
    class Blober {
      constructor(fileData, fileType){
        this.fileData = fileData;
        this.fileType = fileType;
      }
    }
    global.Blob = Blober;
    global.window.navigator.msSaveOrOpenBlob=true;
    wrapper = mount(
      <WithLoadingSubmissionForm {...props} />);
  });

  it('should handle download in IE10+', async () => {
    const state = {
      uploadPresent: true,
      uploadSuccess: null,
    };
    wrapper.setState(state);
    expect(wrapper.find('input[name="button"]').length).toBe(1);
    wrapper.find('input[name="button"]').simulate('click');
    wrapper.instance().forceUpdate();
  });

  it('should handle download other browsers', async () => {
    const state = {
      uploadPresent: true,
      uploadSuccess: null,
    };
    const document = {
      children: [],
      createElement: (newElement) => {
        return { element: 
          { newElement: { 
            click: () => jest.fn()
          }
          }
        };
      },
      body: {
        appendChild: (child) => { this.children.push(child);} 
      }
    };
    const URL = {
      createObjectURL: (file) => { return 'http//'; },
      revokeObjectURL: (url) => jest.fn()
    };
    global.window.navigator.msSaveOrOpenBlob = false;
    global.window.URL = URL;
    global.document = document;
    global.URL = URL;
    wrapper.setState(state);
    expect(wrapper.find('input[name="button"]').length).toBe(1);
    wrapper.find('input[name="button"]').simulate('click');
    jest.useFakeTimers();
  });
});

describe('test input fields', () => {
  beforeEach(() => {
    props.item.requiresFiles = false;
  });
  afterEach( () => {
    props.item.requiresFiles = true;
  });

  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }],
      result: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }]
    }
  };

  it('should render text input', () => {
    wrapper = mount(
      <Provider store={store}>
        <WithLoadingSubmissionForm {...props} />
      </Provider>);
    expect(wrapper.find('textarea').length).toBe(1);
    props.item.requiresFiles = true;
  });

  it('should handle on blur', () => {
    wrapper = mount(
      <Provider store={store}>
        <WithLoadingSubmissionForm {...props} />
      </Provider>);
    wrapper.find('textarea').simulate('blur', event);
    jest.runAllTimers();
    expect(wrapper.find('textarea').length).toBe(1);
    props.item.requiresFiles = true;
  });
});

describe('test functions', () => {
  const wrapper = mount( 
    <WithLoadingSubmissionForm store={store} {...props} />);
  wrapper.setProps({  
    submissionInfo:{
      submissions:[{
        'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540191551/w26o4c86mw4047ttwfld","publicId":"w26o4c86mw4047ttwfld","fileName":"airticket.pdf"}',
        'tripId': '35678',
        'checklistItemId': 1,
        'id': 'St1pYTwhT',
        'updatedAt': '2018-10-22T06:59:12.056Z',
        'createdAt': '2018-10-22T06:59:12.056Z',
        'deletedAt': null
      }],
      postSuccess: true,
      successStatus: true
    },item: {'id': 1,
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
        origin:'Nairobi, Kenya',
        destination:'Kampala, Uganda',
        requestId: '35678',
      }
    ]});

  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }],
      result: [{
        name: 'test.pdf', 
        lastModified: 1517684494000, 
        lastModifiedDate: 'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)', webkitRelativePath: '', 
        size: 481,
      }]
    }
  };
  jest.useFakeTimers();
  jest.runAllTimers();
  it('componentWillRecieveProps', () => {
    expect(wrapper.props().submissionInfo.postSuccess).toBe(true);
  });

});
