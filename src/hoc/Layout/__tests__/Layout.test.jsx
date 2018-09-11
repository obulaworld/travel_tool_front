import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Layout } from '..';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

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

describe('<Layout />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Layout location={{}}>
            <div>
              Test Content
            </div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render all the components except the notification pane', () => {
    expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('should display the notification pane when the notification icon gets clicked', () => {
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
    const closeIcon = wrapper.find('.notifications-header__close-btn');
    const openNotificationIcon = wrapper.find('.navbar__navbar-notification');
    openNotificationIcon.simulate('click');
    expect(wrapper.find('.notification.hide').exists()).toBeFalsy();
    closeIcon.simulate('click');
    expect(wrapper.find('.notification.hide').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it.skip('should log the user out when the logout button is clicked', () => {
    const spy = sinon.spy(wrapper.instance(), 'logout');
    wrapper.find('#logout').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(history.push).toHaveBeenCalledWith('/');
  });

  describe('Layout Shallow', () => {
    let shallowWrapper;

    beforeEach(() => {
      shallowWrapper = shallow(
        <Layout location={{}}>
          <div>
            Test
          </div>
        </Layout>
      );
    });

    it('should call handleHideSearchBar method', () =>{
      shallowWrapper.instance().handleHideSearchBar();
      expect(shallowWrapper.state('openSearch')).toBeTruthy;
    });

    it('should handle handleOverlay method', ()=> {
      shallowWrapper.instance().handleOverlay();
      expect(shallowWrapper.state('hideOverlay')).toBe(true);
    });

    it('should handle handleShowDrawer method', ()=> {
      shallowWrapper.instance().handleShowDrawer();
      expect(shallowWrapper.state('hideOverlay')).toBe(false);
    });
  });
});
