import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Approvals } from '..';
import { submissionInfo } from '../../../mockData/checklistSubmissionMockData';


const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  actionBtn: 'New Request',
  onClickItem: jest.fn(),
  fetchUserApprovals: jest.fn(),
  openModal: jest.fn(),
  getCurrentUserRole: ['Manager'],
  approvals: {
    approvals: [
      {
        id: '245923RTF',
        duration: '3 days',
        status: 'Approved',
        name: 'Jomo Kenyatta',
        tripType: 'oneWay',
        trips: [
          {
            departureDate: '2018-09-20',
            origin: 'Lagos',
            destination: 'Angola'
          }
        ]
      }
    ],
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 10,
      onPageChange: jest.fn()
    },
    isLoading: false,
    pastApprovalsCount: 1,
    openApprovalsCount: 1
  },
  history: {
    push: jest.fn()
  },
  location: {
    search: ''
  },
  fetchRequestsError: jest.fn(),
  message: '',
  match: {
    params: {
      requestId: '245923RTF'
    }
  },
  submissionInfo
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  }
};

const store = mockStore(initialState);

describe('<ApprovalsPage>', () => {
  it('should render the Approvals page without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Approvals {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find('Approvals').length).toBe(1);
    wrapper.unmount();
  }); 

  it('calls the onPageChange method', () => {
    props.approvals.pagination.pageCount = 4;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(
      wrapper.find(Approvals).instance(),
      'fetchFilteredApprovals'
    );
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    wrapper.unmount();
  });

  it('calls get entries with limit on select items per page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(
      wrapper.find(Approvals).instance(),
      'getEntriesWithLimit'
    );
    wrapper
      .find('.dropdown__list__item')
      .first()
      .simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  describe('Approvals page filters', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Approvals {...props} />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('it filters approvals by status=open', () => {
      const openButton = wrapper.find('#open-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1&status=open');
    });

    it('it filters approvals by status=past', () => {
      const openButton = wrapper.find('#past-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1&status=past');
    });

    it('it fetches all approvals by clicking all', () => {
      const openButton = wrapper.find('#all-button');
      openButton.simulate('click');
      expect(props.history.push).toHaveBeenCalledWith('/requests/my-approvals?page=1');
    });

    it('updates searchQuery on receiving receiving location props', () => {
      const approvals = wrapper.find(Approvals);
      approvals.instance().fetchFilteredApprovals('?status=open');
      expect(approvals.instance().state.searchQuery).toEqual('?status=open');
    });
  });
});
