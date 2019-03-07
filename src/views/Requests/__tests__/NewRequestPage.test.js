import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MutationObserver from 'mutation-observer';
import NewRequestPageView, { NewRequestPage } from '../NewRequestPage';


global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

let props1 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'oneWay',
    approver: 'Samuel Kubai',
    manager: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'male',
    status: 'Verified',
    trips: [
      {
        id: 'fhafi',
        departureDate: '2018-09-20',
        origin: 'Lagos',
        destination: 'Angola',
        returnDate: '2019-09-22'
      }
    ],
    comments:[],
    department: 'TDD',
    role: 'Software Developer'
  },
  currentUser: {
    id: '2',
    fullName: 'Collins Muru',
    email: 'collins.muru@andela.com',
    userId: '-LJNw1BsT0LP_E4l2peP',
    passportName: 'Collins Njau',
    department: 'Talent & Development',
    occupation: 'Software Developer',
    manager: 'Collins',
    gender: 'Male',
    createdAt: '2018-09-14T12:48:11.266Z',
    updatedAt: '2018-09-16T07:53:48.835Z',
    roleId: 401938
  },
  fetchingRequest: false,
  fetchUserRequestDetails:jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    }
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
};

let props2 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'oneWay',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: 'fhafdi',
        departureDate: '2018-09-20',
        origin: 'Lagos',
        destination: 'Angola',
        returnDate: '2019-09-22',
        travelReasons: 44,
      }
    ],
    comments: [],
    department: 'TDD',
    role: 'Software Developer'
  },
  currentUser: {
    id: '2',
    fullName: 'Collins Muru',
    email: 'collins.muru@andela.com',
    userId: '-LJNw1BsT0LP_E4l2peP',
    passportName: 'Collins Njau',
    department: 'Talent & Development',
    occupation: 'Software Developer',
    manager: 'Collins',
    gender: 'Male',
    createdAt: '2018-09-14T12:48:11.266Z',
    updatedAt: '2018-09-16T07:53:48.835Z',
    roleId: 401938
  },
  fetchingRequest: true,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    }
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
};

let props3 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'multi',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: '47uy32',
        departureDate: '2018-09-20',
        origin: 'Lagos, Nigeria',
        destination: 'Nairobi, Kenya',
        returnDate: '2018-09-22',
        travelReasons: 44,
        reasons: {
          title: 'reason',
          description: 'description'
        }
      },
      {
        id: '47y73',
        departureDate: '2019-09-24',
        origin: 'Nairobi, Kenya',
        destination: 'Lagos, Nigeria',
        returnDate: null,
        travelReasons: null,
        otherTravelReasons: 'Another Reason'
      }
    ],
    comments: [
      {
        creatingComments: false,
        title: 'title',
        userId: 2,
        user: 'Adeniyi Funmbi',
        createdAt: '2019-09-24'
      },
      {
        title: 'title',
        userId: 2,
        user: 'Adeniyi Funmbi',
        createdAt: '2019-09-24'
      }
    ],
    department: 'TDD',
    role: 'Software Developer'
  },
  currentUser: {
    picture: 'picture',
    id: '2',
    fullName: 'Collins Muru',
    email: 'collins.muru@andela.com',
    userId: '-LJNw1BsT0LP_E4l2peP',
    passportName: 'Collins Njau',
    department: 'Talent & Development',
    occupation: 'Software Developer',
    manager: 'Collins',
    gender: 'Male',
    createdAt: '2018-09-14T12:48:11.266Z',
    updatedAt: '2018-09-16T07:53:48.835Z',
    roleId: 401938
  },
  fetchingRequest: false,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    }
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
};

let props4 = {
  requestData: {
    id: 'xDh20btGz',
    name: 'Adeniyi Funmbi',
    tripType: 'multi',
    manager: 'SamuelKubai',
    approver: 'Samuel Kubai',
    timeApproved: '2018-09-20',
    gender: 'Male',
    status: 'Approved',
    trips: [
      {
        id: '47uy32',
        departureDate: '2019-09-20',
        origin: 'Lagos, Nigeria',
        destination: 'Nairobi, Kenya',
        returnDate: '2019-09-22',
        travelReasons: 44,
        reasons: {
          title: 'reason',
          description: 'description'
        }
      },
      {
        id: '47y73',
        departureDate: '2019-09-24',
        origin: 'Nairobi, Kenya',
        destination: 'Lagos, Nigeria',
        returnDate: null,
        travelReasons: null,
        otherTravelReasons: 'Another Reason'
      }
    ],
    comments: [],
    department: 'TDD',
    role: 'Software Developer'
  },
  currentUser: {
    id: '2',
    fullName: 'Collins Muru',
    email: 'collins.muru@andela.com',
    userId: '-LJNw1BsT0LP_E4l2peP',
    passportName: 'Collins Njau',
    department: 'Talent & Development',
    occupation: 'Software Developer',
    manager: 'Collins',
    gender: 'Male',
    createdAt: '2018-09-14T12:48:11.266Z',
    updatedAt: '2018-09-16T07:53:48.835Z',
    roleId: 401938
  },
  fetchingRequest: false,
  fetchUserRequestDetails: jest.fn(),
  user: {
    UserInfo: {
      name: 'John Doe',
      email: 'johnDoe@andela.com'
    }
  },
  getUserData: jest.fn(),
  page: 'Requests',
  match: {
    params: { requestId: 'xDh20btGx' }
  },
};


const initialState1 = {
  user: props1.currentUser,
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props1.requestData,
    fetchingRequest: false
  },
  showCommentBox: true,
  comments:{
    creatingComments: false
  }
};

const initialState2 = {
  user: props2.currentUser,
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props2.requestData,
    fetchingRequest: true
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  }
};

const initialState3 = {
  user: props3.currentUser,
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props3.requestData,
    fetchingRequest: false
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  }
};

const initialState4 = {
  user: props4.currentUser,
  fetchUserRequestDetails: jest.fn(),
  requests: {
    requestData: props3.requestData,
    fetchingRequest: false
  },
  showCommentBox: false,
  comments: {
    creatingComments: false
  }
};

const mockStore = configureStore();
let wrapper;
let wrapped;

describe('<Request Page>', () => {
  it('renders appropriately', () => {
    const store = mockStore(initialState1);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props1} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request false and request approved', () => {
    const store = mockStore(initialState3);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props3} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request false and request approved for multicity', () => {
    const store = mockStore(initialState4);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props4} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders appropriately with null fetching request true and request approved', () => {
    const store = mockStore(initialState2);
    wrapped = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props2} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapped).toMatchSnapshot();
    expect(wrapped.length).toBe(1);
    wrapped.unmount();
  });

  it('should simulate click on comment button', () => {
    const store = mockStore(initialState1);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NewRequestPageView {...props1} />
        </MemoryRouter>
      </Provider>
    );

    const inst = wrapper.find('RequestDetails').instance();
    const spy = jest.spyOn(inst, 'handleDisplayCommentBox');

    wrapper.find('.requestDetails__add-comment').simulate('click');
    wrapper.find('.requestDetails__add-comment').simulate('click');

    expect(spy).toBeCalled();
    wrapper.unmount();
  });
});
