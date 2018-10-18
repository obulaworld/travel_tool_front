import React from 'react';
import sinon from 'sinon';
import { RoleDetails } from '..';

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
  isLoading: false,
  getCurrentUserRole: ['Travel Administrator', 'Requester'],
  history: {
    push: sinon.spy()
  },
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
  putRoleData: sinon.spy()
};

const state = {
  headTitle: '',
  userDetail: ''
};

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
});
