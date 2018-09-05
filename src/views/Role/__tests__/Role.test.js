import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedRole, { Role } from '../index';

const props = {
  getRole: {
    result: [
      {
        id: 401938,
        roleName: 'Requester',
        description: 'Can make travel request',
        createdAt: '2018-08-16T11:11:52.181Z',
        updatedAt: '2018-08-16T11:11:52.181Z',
        users: [{ email: 'taiwo.sunday@andela.com' }]
      },
      {
        id: 53019,
        roleName: 'Manager',
        description: 'Can request and approve travel request ',
        createdAt: '2018-08-16T11:11:52.181Z',
        updatedAt: '2018-08-16T11:11:52.181Z',
        users: []
      }
    ]
  },
  user: {
    UserInfo: {
      name: 'John Doe',
      id: '-LHJlG',
      picture: 'http://www.image.com/jepg'
    }
  },
  getCurrentUserRole: 'Super Administrator',
  getRoleData: sinon.spy(() => Promise.resolve()),
  isLoading: false,
  history: {
    push: jest.fn()
  },
  putRoleData: jest.fn(),
  errors: [],
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  onNotificationToggle: jest.fn(),
  closeModal: jest.fn(),


};

const initialState = {
  role: {
    putRoleData: [],
    getRole: {},
    roleErrors: ''
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  auth: {
    user: {
      UserInfo: {
        name: 'John Doe',
        id: '-LHJlG',
        picture: 'http://www.image.com/jepg'
      }
    }
  },
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('<RolePage>', () => {
  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedRole {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(Role.prototype, 'componentDidMount');
    const { getRoleData } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(spy.called).toEqual(true);
    expect(getRoleData.called).toEqual(true);
    wrapper.unmount();
  });

  it('should display the notification pane when the notification icon gets clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    const notificationIcon = wrapper.find('.navbar__navbar-notification');
    notificationIcon.simulate('click');
    expect(wrapper.find('.notification').exists()).toBeTruthy();
    expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').length).toBe(1);
    wrapper.unmount();
  });

  it('should close the notification pane on the second click of the notification icon', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    const notificationIcon = wrapper.find('.navbar__navbar-notification');
    notificationIcon.simulate('click');
    notificationIcon.simulate('click');
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeFalsy();
  });

  it('should close the notification pane when the close icon is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
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

  it('should call handleHideSearchBar method', () => {
    const wrapper = shallow(<Role {...props} />);
    wrapper.instance().handleHideSearchBar();
    expect(wrapper.state('openSearch')).toBeTruthy;
  });

  it('should not redirect the user when the user is an the admin', () => {
    const { history } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(history.push).toHaveBeenCalledTimes(0);
    wrapper.unmount();
  });

  it('should redirect the user when the  user is not a super admin admin on componentDidMount method', () => {
    const { history } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...{ ...props, getCurrentUserRole: ' Administrator' }} />
        </MemoryRouter>
      </Provider>
    );
    expect(history.push).toHaveBeenCalledWith('/');
    wrapper.unmount();
  });

  it.skip('should set `shouldOpen` prop to `true` when add role button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(wrapper.find('Role').props().shouldOpen).toEqual(true);
  });

  it('should set `visibility` prop to `visible` when add nre role button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Role {...{ ...props, shouldOpen: true, modalType: 'new model' }} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });

  it('should handle handleOverlay method', () => {
    const wrapper = shallow(<Role {...props} />);
    wrapper.instance().handleOverlay();
    expect(wrapper.state('hideOverlay')).toBe(false);
  });
  it('should handle handleShowDrawer method', () => {
    const wrapper = shallow(<Role {...props} />);
    wrapper.instance().handleShowDrawer();
    expect(wrapper.state('hideOverlay')).toBe(true);
  }); 
});
