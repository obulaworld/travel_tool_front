import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import Approvals from '../index';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  actionBtn:'New Request'
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
    const wrapper = shallow(<Approvals {...props} />);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should render all the components except the notification pane', () => {
    const wrapper = shallow(<Approvals {...props} />);
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

  it('calls the onPageChange method', () => {
    const spy = sinon.spy(Approvals.prototype, 'onPageChange');
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Approvals {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    expect(spy.calledWith(2)).toEqual(true);
    wrapper.unmount();
  });

});
