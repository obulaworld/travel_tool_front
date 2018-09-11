import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Requests, mapStateToProps } from '..';
import { fetchRoleUsers } from '../../../redux/actionCreator/roleActions';

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
    currentPage: 1,
    pageCount: 4,
    dataCount: 10,
    onPageChange: sinon.spy(),
  },
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  fetchRoleUsers: sinon.spy(() => Promise.resolve()),
  fetchUserRequestsError: null,
  openRequestsCount: 1,
  pastRequestsCount: 1,
  isLoading: false,
  history: {
    push: jest.fn()
  },
  location: {
    search: '?page=1'
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
  modalType: null,
  openModal: jest.fn(),
  closeModal: jest.fn(),
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
  },
  getCurrentUserRole: 'tomato'
};
const mockStore = configureStore();
const store = mockStore(initialState);


describe('<Requests>', () => {
  it('should render the Requests without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the componentDidMount method', () => {
    const spy = sinon.spy(Requests.prototype, 'componentDidMount');
    const { fetchUserRequests, fetchRoleUsers } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(spy.called).toEqual(true);
    expect(fetchUserRequests.called).toEqual(true);
    expect(fetchUserRequests.calledWith('?page=1')).toEqual(true);
    expect(fetchRoleUsers.called).toEqual(true);
    expect(fetchRoleUsers.calledWith(53019)).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method
    when the next pagination button is clicked`, () => {
    const { fetchUserRequests } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(fetchUserRequests.called).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method with the correct query
    when the next pagination button is clicked`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...{
            ...props,
            location:{
              search: ''
            }
          }} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('#next-button').simulate('click');
    expect(spy.called).toEqual(true);
    expect(spy.calledWith('?page=2')).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method
    with the selected limit when a limit is selected`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('.dropdown__list__item').first().simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('?page=1&limit=10')).toEqual(true);
    wrapper.unmount();
  });

  it(`calls the fetchRequests method with the last possible page
  when a limit and a page above the available pages is selected`, () => {
    const { pagination } = props;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...{
            ...props,
            pagination: {...pagination, currentPage: 4},
            location: { search: '?page=4&status=open'}
          }} />
        </MemoryRouter>
      </Provider>
    );
    const spy = sinon.spy(wrapper.find(Requests).instance(), 'fetchRequests');
    wrapper.find('.dropdown__list__item').last().simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('?page=1&status=open&limit=30')).toEqual(true);
    wrapper.unmount();
  });

  it('should render the child components', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.rp-requests__header').length).toBe(1);// RequestsPanelHeader
    expect(wrapper.find('Table').length).toBe(1);
    expect(wrapper.find('RequestPanelHeader').length).toBe(1);
    expect(wrapper.find('WithLoading').length).toBe(1); //WithLoading HOC containing Requests
    // Since the element is always on the DOM, the page length will always be one
    expect(wrapper.find('Pagination').length).toBe(1);
    wrapper.unmount();
  });

  it('should call renderRequestPanelHeader method', () =>{
    const wrapper = shallow(<Requests {...props} />);
    const instance = wrapper.instance();
    const spyon = jest.spyOn(instance, 'renderRequestPanelHeader');
    expect(spyon).toHaveBeenCalledTimes(0);
  });

  it('renders as expected', () => {
    const wrapper = shallow(<Requests {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should set `shouldOpen` prop to `true` when new request button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper
      .find('.btn-new-request')
      .simulate('click');
    expect(wrapper.find('Requests').props().shouldOpen).toEqual(true);
  });

  it('should set `visibility` prop to `visible` when new request button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Requests {...{...props, shouldOpen: true, modalType: 'new model'}} />
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
