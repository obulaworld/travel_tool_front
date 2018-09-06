import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Approvals } from '../index';
import mockAxios from '../../../redux/__mocks__/mockAxios';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  actionBtn:'New Request',
  onClickItem: jest.fn(),
  fetchUserApprovals: jest.fn(),
  approvals: {
    approvals: [
      {
        'id':'245923RTF',
        'destination':'Lagos',
        'origin':'Nairobi',
        'duration':'3 days',
        'startDate':'12 Oct 2018',
        'status':'Approved',
        'name':'Jomo Kenyatta',
      }
    ],
    pagination: {
      currentPage: 1,
      pageCount: 4,
      dataCount: 10,
      onPageChange: jest.fn(),
    },
    isLoading: false,
  },
  history: [],
  location: {
    search: ''
  }
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

  it('should render all the components except the notification pane', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.rp-requests__header').length).toBe(1);
    expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('Pagination').length).toBe(1);
    wrapper.unmount();
  });

  it('should display the notification pane when the notification icon gets clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const notificationIcon = wrapper.find('.navbar__navbar-notification');
    notificationIcon.simulate('click');
    expect(wrapper.find('.notification').exists()).toBeTruthy();
    expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').length).toBe(1);
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('should close the notification pane when the close icon is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const closeIcon = wrapper.find('.notifications-header__close-btn');
    closeIcon.simulate('click');
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').length).toBe(0);
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('should call handleHideSearchBar method', () =>{
    const wrapper = shallow(<Approvals {...props} />);
    wrapper.instance().handleHideSearchBar();
    expect(wrapper.state('openSearch')).toBeTruthy;
  });

  it('calls the onPageChange method', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Approvals).instance(), 'fetchFilteredApprovals');
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    wrapper.unmount();
  });

  it('should handle handleOverlay method', ()=> {
    const wrapper = shallow(<Approvals {...props} />);
    wrapper.instance().handleOverlay();
    expect(wrapper.state('hideOverlay')).toBe(false);
  });
  it('should handle handleShowDrawer method', ()=> {
    const wrapper = shallow(<Approvals {...props} />);
    wrapper.instance().handleShowDrawer();
    expect(wrapper.state('hideOverlay')).toBe(true);
  });

  it('calls get entries with limit on select items per page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Approvals).instance(), 'getEntriesWithLimit');
    wrapper.find('.dropdown__list__item').first().simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  describe('Approvals page filters', () => {
    let axios, wrapper, spy;

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
      const history = wrapper.find('Approvals').prop('history');
      expect(history[0].indexOf('?status=open')).toBeTruthy();
    });

    it('it filters approvals by status=past', () => {
      const openButton = wrapper.find('#past-button');
      openButton.simulate('click');
      const history = wrapper.find('Approvals').prop('history');
      expect(history[0].indexOf('?status=past')).toBeTruthy();
    });

    it('it fetches all approvals by clicking all', () => {
      const openButton = wrapper.find('#all-button');
      openButton.simulate('click');
      const history = wrapper.find('Approvals').prop('history');
      expect(history[0].includes('status')).toBeFalsy();
    });

    it('updates searchQuery on receiving receiving location props', () => {
      const approvals = wrapper.find(Approvals);
      approvals.instance()
        .componentWillReceiveProps({location: {search: '?status=open'}});
      expect(approvals.instance().state.searchQuery).toEqual('?status=open');
    });
  });
});
