import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import moxios from 'moxios';
import ConnectedRequestDetailsModal,
{ RequestDetailsModal } from '../RequestsModal';
import { fetchRequestsDetailsResponse,
  userImage } from '../../../redux/__mocks__/mocks';
import requestData from '../__mocks__/requestData';
import testRequestDetailsResp from '../../../services/__mocks__/mockApprovals';
import rootSaga from '../../../redux/middleware';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
  requests: {requestData: {tripType: 'multi', trips:[]}},
  approvals: [],
  modal: {modal: {}},
  auth: { ...userImage }
});

store.runSagas = sagaMiddleware.run;

let wrapper;
const props = {
  requestId: 'xDh20cuGx',
  user: {
    picture: 'http://my-image'
  },
  requestData: {
    id: 'xDh20cuGx',
    name: 'Test user C',
    origin: 'Lagos',
    destination: 'Nairobi',
    manager: 'Samuel Kubai',
    department: 'TDD',
    role: 'Software Developer',
    status: 'Approved',
    userId: '-MUyHJmKrxA90lPNQ1FOLNm',
    departureDate: '2018-09-12',
    arrivalDate: '2018-11-12',
    createdAt: '2018-09-04T10:38:12.141Z',
    tripType: 'multi',
    'trips': [
      {
        'origin': 'Lagos',
        'destination': 'Nairobi',
        'departureDate': '2018-12-09',
        'arrivalDate': '2018-12-15'
      },
      {
        'origin': 'Nairobi',
        'destination': 'New York',
        'departureDate': '2018-12-15',
        'arrivalDate': '2019-01-10'
      },
      {
        'origin': 'New York',
        'destination': 'Lagos',
        'departureDate': '2019-01-10',
        'arrivalDate': '2019-01-20'
      },
      {
        'origin': 'Lagos',
        'destination': 'Nairobi',
        'departureDate': '2019-01-30',
        'arrivalDate': '2019-02-13'
      }
    ],
    comments: [
      {
        id: 1,
        userName: 'Random User',
        comment: 'This is a comment',
        createdAt: '2018-09-04T10:38:12.141Z',
        picture: 'http://my-image'
      },
      {
        id: 2,
        userName: 'Random User Two',
        comment: 'This is another comment',
        createdAt: '2018-10-04T10:38:12.141Z',
        picture: 'http://my-image'
      },
    ]
  },
  fetchUserRequestDetails: sinon.spy(() => Promise.resolve()),
  requests: {
    requestData: {
      id: '1',
      name: 'Orion',
      status: 'Approved'
    }
  },
  updateRequestStatus: jest.fn(() => Promise.resolve()),
  isStatusUpdating: false
};

const componentDidMountSpy = sinon.spy(RequestDetailsModal.prototype, 'componentDidMount');

describe('Render RequestsModal component', () => {
  beforeEach(() => {
    wrapper = shallow(<RequestDetailsModal {...props} />);
  });
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('tests that the component successfully rendered', () => {
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('should call componentDidMount()', () => {
    const {fetchUserRequestDetails, requestData} =  props;
    expect(componentDidMountSpy.called).toBe(true);
    expect(fetchUserRequestDetails.called).toEqual(true);
    expect(fetchUserRequestDetails.calledWith(requestData.id)).toEqual(true);
  });

  it('should render the RequestsModal as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render approveTextColor when button is clicked', () => {
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveTextColor')).toBe('white');
  });

  it('should render rejectTextColor when button is clicked', () => {
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectTextColor')).toBe('white');
  });

  it('should render approveColor when button is clicked', () => {
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveColor')).toBe('#49AAAF');
  });

  it('should render rejectColor when button is clicked', () => {
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectColor')).toBe('#FF5359');
  });

  it('should call renderStatusAsBadge function', () => {
    const action = wrapper.instance();
    const renderStatusAsBadge = jest.spyOn(wrapper.instance(), 'renderStatusAsBadge');
    action.renderStatusAsBadge('Approved');
    expect(renderStatusAsBadge).toBeCalled();
  });

  it('should call changeButtonColor function', () => {
    const button = {
      id: 1,
    };
    const action = wrapper.instance();
    const changeButtonColor = jest.spyOn(wrapper.instance(), 'changeButtonColor');
    action.changeButtonColor(button, 'Rejected');
    expect(changeButtonColor.mock.calls.length).toBe(1);
  });

  describe('RequestModal API fetch actions', () => {
    beforeAll(() => {
      store.runSagas(rootSaga);
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('it dispatches actions to fetch a request\'s recorded trips', (done) => {
      expect.assertions(3);
      const requestId = 'testRequestId';
      const url = `${baseUrl}/requests/${requestId}`;
      moxios.stubRequest(url, {
        status: 200,
        response: testRequestDetailsResp
      });

      const wrapper = mount(
        <Provider store={store}>
          <ConnectedRequestDetailsModal requestId="testRequestId" />
        </Provider>
      );
      process.nextTick(() => {
        expect(moxios.requests.mostRecent().url).toEqual(url);
        const dispatchedActions = store.getActions();
        // Did the modal send the correct requestId?
        const initFetchAction = dispatchedActions.find(action => (
          action.type === 'FETCH_USER_REQUEST_DETAILS'
        ));
        expect(initFetchAction.requestId).toBe(requestId);
        // Will the modal receive the expected trips once state updates?
        const successFetchAction = dispatchedActions.find(action => (
          action.type  === 'FETCH_USER_REQUEST_DETAILS_SUCCESS'
        ));
        expect(successFetchAction.trips).toEqual(testRequestDetailsResp.trips);
        done();
      });
    });
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ConnectedRequestDetailsModal />
        </Provider>
      );
      expect(wrapper.length).toBe(1);
    });
  });
});
