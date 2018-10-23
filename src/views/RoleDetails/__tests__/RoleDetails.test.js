import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedRoleDetails, { RoleDetails } from '../index';


let wrapper;
const props = {
  travelTeamMembers: [
    {
      fullName: 'A user',
      centers: [
        {
          id: 12345,
          location: 'Lagos, Nigeria'
        }
      ]
    }
  ],
  closeModal: jest.fn(),
  fetchRoleUsers: sinon.spy(),
  updateUserCenter: jest.fn(),
  getRoleData: jest.fn(),
  isLoading: false,
  getCurrentUserRole: ['Travel Administrator', 'Requester'],
  history: {
    push: jest.fn(),
  },
  isLoaded: true,
  openModal: jest.fn(),
  shouldOpen: false,
  modalType: 'new model',
  match: {
    params: {
      roleId: 335498
    }
  },
  roleName: 'Travel team member',
  fetchCenters: sinon.spy(),
  centers: [{}],
  putRoleData: sinon.spy(),
};


const initialState = {
  modal: {
    shouldOpen: false,
    modalType: null
  }
};


const user = {
  id: 1,
  role: ['Travel team member'],
  center: 'lagos'
};

const mockStore = configureStore();
const store = mockStore(initialState);


describe('<ROleDetails />', () => {
  beforeEach(() => {
    wrapper = shallow(<RoleDetails {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the fetchRoleUser prop method on
    componentDidMount`, () => {
    expect(props.fetchRoleUsers.called).toEqual(true);
    expect(props.fetchRoleUsers.calledWith(335498)).toEqual(true);
  });

  it(`calls renders the RoleDetails Table with
    the correct number of users`, () => {
    const roleDetailsTable = wrapper
      .find('WithLoading')
      .dive()
      .find('RoleDetailsTable')
      .dive();
    expect(roleDetailsTable.find('.table__rows').length).toEqual(1);
  });


  it('should call handleEditCenter  ', () => {
    const shallowWrapper = shallow(<RoleDetails {...props} />);
    shallowWrapper.setState({
      headTitle: 'Change Center',
      userDetail: user ,
    });
    sinon.spy(shallowWrapper.instance(), 'handleEditCenter');
    shallowWrapper.instance().handleEditCenter(user);
    expect(shallowWrapper.instance().handleEditCenter.calledOnce).toEqual(true);
  });

  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedRoleDetails {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

});
