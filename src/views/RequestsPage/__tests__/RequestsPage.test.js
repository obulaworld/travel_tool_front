import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { RequestsPage, mapStateToProps } from '../RequestsPage';

const props = {
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Open',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
    {
      id: 'xDh20btGy',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Rejected',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
    {
      id: 'xDh20btGx',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Approved',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
  ],
  pagination: {
    currentPage: 2,
    pageCount: 4,
    onPageChange: sinon.spy(),
  },
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  fetchUserRequestsError: null,
  openRequestsCount: 1,
  pastRequestsCount: 1,
  url: '?page=1',
  isLoading: false,
  history: {
    push: jest.fn()
  },
  user: {
    UserInfo: {
      name: 'John Doe'
    }
  },
  createNewRequest: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  modalType: null
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
  },
  requestsReducer: {
    requests: [],
    request: {},
    loading: false,
    errors: []
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  }
};
const mockStore = configureStore();
const store = mockStore(initialState);


describe('<RequestsPage>', () => {
  it('should render the RequestsPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(RequestsPage.prototype, 'componentDidMount');
    const { fetchUserRequests } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(spy.called).toEqual(true);
    expect(fetchUserRequests.called).toEqual(true);
    expect(fetchUserRequests.calledWith('?page=1')).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the onPageChange method and the fetchUserRequests method
    when pagination button is clicked`, () => {
    const { fetchUserRequests } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('#next-button').simulate('click');
    expect(fetchUserRequests.called).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    expect(fetchUserRequests.called).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the getRequestsWithLimit method and the fetchUserRequests method
    when pagination button is clicked`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.dropdown__list__item').first().simulate('click');
    const { fetchUserRequests } = props;
    const stateOnClick = wrapper
      .find(RequestsPage)
      .instance()
      .state;
    expect(stateOnClick).toEqual({
      hideNotificationPane: true,
      hideSideBar: false,
      limit: 10,
      hideNewRequestModal: true,
      openSearch: false,
      selectedLink: 'request page',
    });
    expect(fetchUserRequests.called).toEqual(true);
    wrapper.unmount();
  });

  it('should render all the components except the notification pane', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.rp-requests__header').length).toBe(1);// RequestsPanelHeader
    expect(wrapper.find('Table').length).toBe(1);
    expect(wrapper.find('RequestPanelHeader').length).toBe(1);
    expect(wrapper.find('WithLoading').length).toBe(1); //WithLoading HOC containing Requests
    expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
    // Since the element is always on the DOM, the page length will always be one
    // so I'm checking if the 'hide' class exists
    // the presence of the 'hide' class means that the element has been hidden
    // the absence means the element is visible
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

  it('should call handleHideSearchBar method', () =>{
    const wrapper = shallow(<RequestsPage {...props} />);
    wrapper.instance().handleHideSearchBar();
    expect(wrapper.state('openSearch')).toBeTruthy;
  });

  it('should call renderRequestPanelHeader method', () =>{
    const wrapper = shallow(<RequestsPage {...props} />);
    const instance = wrapper.instance();
    const spyon = jest.spyOn(instance, 'renderRequestPanelHeader');
    expect(spyon).toHaveBeenCalledTimes(0);
  });

  it('renders as expected', () => {
    const wrapper = shallow(<RequestsPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should set `shouldOpen` prop to `true` when new request button is clicked', () => {
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
    expect(wrapper.find('RequestsPage').props().shouldOpen).toEqual(true);
  });

  it('should set `visibility` prop to `visible` when new request button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RequestsPage {...{...props, shouldOpen: true, modalType: 'new request'}} />
        </MemoryRouter>
      </Provider>
    );
    wrapper
      .find('.btn-new-request')
      .simulate('click');
    expect(wrapper.find('Modal').at(0).props().visibility).toEqual('visible');
  });

  it('maps state to props and return the expected object', () => {
    const requests = {
      requests: [],
      errors: [],
      loading: false,
    };
    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null,
      }
    };
    const props = mapStateToProps({requests, modal});
    expect(props).toEqual({...requests, ...modal.modal});
  });
});
