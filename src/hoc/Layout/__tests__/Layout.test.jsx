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
  },
  modal: {
    modal: {}
  },
  notifications: []
};

const store = mockStore(initialState);

describe('Layout component', () => {
  xdescribe('<Layout />', () => {
    const props = {
      notifications: []
    };

    let wrapper;

    beforeAll(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Layout {...props} location={{}}>
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
      expect(wrapper.find('.notification').hasClass('hide')).toEqual(true);
      wrapper.unmount();
    });

    it('should display the notification pane when the notification icon gets clicked', () => {
      const notificationIcon = wrapper.find('.navbar__navbar-notification');
      notificationIcon.simulate('click');
      expect(wrapper.find('.notification').exists()).toBeTruthy();
      expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
      expect(wrapper.find('.sidebar').hasClass('hide')).toEqual(true);
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
  });

  describe('Layout Shallow', () => {
    const props = {
      notifications: [],
      children: {},
      location: {}
    };

    let shallowWrapper;

    beforeEach(() => {
      shallowWrapper = shallow(<Layout {...props} />);
    });

    it('should render layout component correctly', (done) => {
      expect(shallowWrapper).toMatchSnapshot();
      done();
    });

    it('should call handleHideSearchBar method', (done) => {
      shallowWrapper.instance().handleHideSearchBar();
      expect(shallowWrapper.state('openSearch')).toBeTruthy;
      done();
    });

    it('should handle handleOverlay method', (done)=> {
      shallowWrapper.instance().handleOverlay();
      expect(shallowWrapper.state('hideOverlay')).toBe(true);
      done();
    });

    it('should handle handleShowDrawer method', (done)=> {
      shallowWrapper.instance().handleShowDrawer();
      expect(shallowWrapper.state('hideOverlay')).toBe(false);

      done();
    });

    it('should call onNotificationToggle method', (done) => {
      const onNotificationToggleSpy= jest
        .spyOn(shallowWrapper.instance(), 'onNotificationToggle');
      shallowWrapper.instance().onNotificationToggle();
      expect(onNotificationToggleSpy).toHaveBeenCalled();

      done();
    });
  });
});
