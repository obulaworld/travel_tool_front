import approvals from '../approvals';
import {
  FETCH_USER_APPROVALS,
  FETCH_USER_APPROVALS_SUCCESS,
  FETCH_USER_APPROVALS_FAILURE
} from '../../constants/actionTypes';

const initState = {};

describe('Approvals Reducer', () => {
  it('returns initial state with unknown actions', () => {
    const unknownAction = {
      type: 'UNKNOWN TYPE'
    };
    expect(approvals(initState, unknownAction)).toEqual({});
  });

  it('updates the error with a fetch failure', () => {
    const errorAction = {
      type: FETCH_USER_APPROVALS_FAILURE,
      error: 'Server error'
    };
    expect(approvals(initState, errorAction).fetchApprovalsError)
      .toBe(errorAction.error);
  });

  it('updates to loading when fetching response', () => {
    const action = {
      type: FETCH_USER_APPROVALS
    };
    expect(approvals(initState, action).isLoading).toBe(true);
  });

  it('returns appovals correctly', () => {
    const action = {
      type: FETCH_USER_APPROVALS_SUCCESS,
      approvals: [{status: 'Open'}],
      message: 'test message',
      meta: {
        pagination: {},
        count: {}
      }
    };
    expect(approvals(initState, action).approvals).toHaveLength(1);
  });
});
