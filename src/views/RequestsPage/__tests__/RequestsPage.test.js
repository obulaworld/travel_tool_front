import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import RequestsPage from '../RequestsPage';

const props = {
  requests: [
    {
      'id':1,
      'destination':'Lagos',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open'
    },
    {
      'id':2,
      'destination':'New York',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Rejected'
    },
    {
      'id':3,
      'destination':'Kampala',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved'
    }
  ],
  pagination: {
    currentPage: 2,
    pageCount: 4,
    onPageChange: sinon.spy(),
  },
  history: {
    push: jest.fn()
  },
  user: {
    UserInfo: {
      name: 'John Doe'
    }
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
const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);
const store = mockStore(initialState);


describe('<RequestsPage>', () => {
  beforeEach(() => {
  });

  it('should render the RequestsPage without crashing', () => {
    const wrapper = shallow(<RequestsPage {...props} />);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the onPageChange method', () => {
    const spy = sinon.spy(RequestsPage.prototype, 'onPageChange');
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    expect(spy.calledWith(2)).toEqual(true);
    wrapper.unmount();
  });

  it('should render all the components except the notification pane', () => {
    const wrapper = shallow(<RequestsPage {...props} />);
    expect(wrapper.find('.rp-requests__header').length).toBe(1);// RequestsPanelHeader
    expect(wrapper.find('Table').length).toBe(1);
    expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('Pagination').length).toBe(1);
    wrapper.unmount();
  });

  it('should display the notification pane when the notification icon gets clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    const notificationIcon = wrapper.find('.navbar__navbar-notification');
    notificationIcon.simulate('click');
    expect(wrapper.find('.notification').exists()).toBeTruthy();
    expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').length).toBe(1);
    expect(wrapper.find('Table').exists()).toBeTruthy();
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('should close the notification pane when the close icon is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    const closeIcon = wrapper.find('.notifications-header__close-btn');
    closeIcon.simulate('click');
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').length).toBe(0);
    expect(wrapper.find('Table').exists()).toBeTruthy();
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it.skip('should log the user out when the logout button is clicked', () => {
    const wrapper = mount(<RequestsPage {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'logout');
    wrapper.find('#logout').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('toggles modal state when close modal button is clicked', (done) => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper
      .find('.btn-new-request')
      .simulate('click');
    const newState = wrapper
      .find(RequestsPage)
      .instance()
      .state;
    process.nextTick(() => {
      expect(newState.hideNewRequestModal).toBe(false);
      done();
    });

  });
});
