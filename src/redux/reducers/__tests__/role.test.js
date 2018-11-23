import roleReducer from '../role';
import * as actionTypes from '../../constants/actionTypes';
import {
  deleteUserRole,
  deleteUserRoleFailure,
  deleteUserRoleSuccess,
  showDeleteRoleModal,
  hideDeleteRoleModal
} from '../../actionCreator/roleActions';
import { fetchRoleUsersResponse } from '../../__mocks__/mocks';
import { travelTeamMembersMockData } from '../../__mocks__/role';

const res = {
  message: 'data',
  result: [
    {
      createdAt: '2018-08-16T11:11:52.181Z',
      description: 'Can perform all task on travela',
      id: 10948,
      roleName: 'Super Administrator',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'taiwo.sunday@andela.com'
        }
      ]
    },
    {
      createdAt: '2018-08-16T11:11:52.181Z',
      description: 'Can view and approve all request on  travela',
      id: 29187,
      roleName: 'Travel Administrator',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: []
    }
  ]
};

const role = {
  email: 'hulk.smash@andela.com',
  roleName: 'Super Admin'
};

describe('Role Reducer', () => {
  const initialState = {
    putRoleData: [],
    getRole: {},
    isLoading: false,
    roleErrors: '',
    roleMessage: '',
    deleteModalState: 'invisible',
    deleteModalRoleId: '',
    travelTeamMembers: []
  };

  it('should return proper initial state', done => {
    expect(roleReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ROLE_DATA', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA
    };
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
    done();
  });

  it('dispatches action GET_ROLE_DATA_SUCCESS:', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA_SUCCESS,
      response: res
    };
    const newState = roleReducer(initialState, action);
    expect(newState.getRole).toEqual(res);
    done();
  });

  it('dispatches action GET_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.GET_ROLE_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.roleErrors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action PUT_ROLE_DATA', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA
    };
    const newState = roleReducer(initialState, action);
    expect(newState.updatingRole).toEqual(true);
    done();
  });

  it('dispatches action PUT_ROLE_DATA_SUCCESS to update role:', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA_SUCCESS,
      roleData: role
    };
    const newState = roleReducer(initialState, action);
    expect(newState.putRoleData).toEqual(role);
    done();
  });

  it('dispatches action PUT_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.PUT_ROLE_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = roleReducer(initialState, action);
    expect(newState.updatingRole).toEqual(false);
    expect(newState.roleErrors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('should delete travel team member on success', (done) => {
    const action = deleteUserRole(1, 2);
    const newState = roleReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    done();
  });

  it('should delete travel team member on success', (done) => {
    const currentState = {
      ...initialState,
      isLoading: true,
      travelTeamMembers: travelTeamMembersMockData
    };
    const action = deleteUserRoleSuccess('Delete Successful', 2);
    const newState = roleReducer(currentState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.travelTeamMembers.length).toEqual(1);
    expect(newState.roleMessage).toEqual('Delete Successful');
    done();
  });

  it('should delete travel team member on failure', (done) => {
    const currentState = {
      ...initialState,
      isLoading: true,
      travelTeamMembers: travelTeamMembersMockData
    };
    const action = deleteUserRoleFailure('Server Error');
    const newState = roleReducer(currentState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.travelTeamMembers.length).toEqual(2);
    expect(newState.roleErrors).toEqual('Server Error');
    done();
  });

  it('should should update `deleteModalState` to `visible`', (done) => {
    const action = showDeleteRoleModal(1);
    const newState = roleReducer(initialState, action);
    expect(newState.deleteModalState).toBe('visible');
    expect(newState.deleteModalRoleId).toEqual(1);
    done();
  });

  it('should should update `deleteModalState` to `invisible`', (done) => {
    const currentState = {
      ...initialState,
      deleteModalState: 'visible',
      deleteModalRoleId: 1
    };
    const action = hideDeleteRoleModal();
    const newState = roleReducer(currentState, action);
    expect(newState.deleteModalRoleId).toBe('');
    expect(newState.deleteModalState).toEqual('invisible');
    done();
  });

  describe('Requests Reducer', () => {
    describe('Fetch role  Reducer', () => {
      const initialState = {};

      it('returns the correct state for FETCH_ROLE_USERS action', () => {
        const action = {
          type: actionTypes.FETCH_ROLE_USERS,
          roleId: 53098
        };
        expect(roleReducer(initialState, action)).toEqual({
          isFetching: true
        });
      });

      it('returns the correct state for FETCH_ROLE_USERS_SUCCESS action', () => {
        const action = {
          type: actionTypes.FETCH_ROLE_USERS_SUCCESS,
          roleName: fetchRoleUsersResponse.roleName,
          users: fetchRoleUsersResponse.users
        };
        expect(roleReducer(initialState, action)).toEqual({
          isFetching: false,
          managers: fetchRoleUsersResponse.users,
          roleName: 'Manager',
          error: ''
        });
      });

      it('returns the correct state for FETCH_ROLE_USERS_FAILURE action', () => {
        const initialState = {};
        const action = {
          type: actionTypes.FETCH_ROLE_USERS_FAILURE,
          error: 'An error occurred'
        };
        expect(roleReducer(initialState, action)).toEqual({
          isFetching: false,
          error: 'An error occurred'
        });
      });
    });
  });
});
