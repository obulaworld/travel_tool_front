import { call, put } from 'redux-saga/effects';
import mockAxios from '../../__mocks__/mockAxios';
import {
  fetchUserApprovalsSuccess,
  fetchUserApprovalsFailure
} from '../../actionCreator';

const action = {
  type: 'FETCH_USER_APPROVALS',
  url: '?status=open'
};

describe('Approvals saga', () => {
  let sagaConstructor, testSaga, axios, ApprovalsApi;

  beforeAll(() => {
    jest.doMock('axios', () => mockAxios);
    axios = require('axios');
    sagaConstructor = require('../approvalsSaga').fetchUserApprovalsSaga;
    ApprovalsApi = require('../../../services/approvalsAPI').default;
    testSaga = sagaConstructor(action);
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should yield a call to getUserApprovals with correct url', async () => {
    const url = action.url;
    expect(testSaga.next().value)
      .toEqual(call(ApprovalsApi.getUserApprovals, url));
  });

  it('sends a get request with the correct url', async () => {
    const urlSearchParams = action.url;
    const fullUrl = `http://127.0.0.1:5000/api/v1/approvals${urlSearchParams}`;
    await ApprovalsApi.getUserApprovals(urlSearchParams);
    expect(axios.get).toHaveBeenCalledWith(fullUrl);
  });

  it('should dispatch an action with the yielded data', async () => {
    const fetchResponse = await ApprovalsApi.getUserApprovals(action.url);
    // expect dispatch with data from response
    expect(testSaga.next(fetchResponse).value)
      .toEqual(put(fetchUserApprovalsSuccess(fetchResponse.data)));
  });

  it('should be done after dispatching the response', () => {
    expect(testSaga.next().done).toBe(true);
  });

  it('should dispatch an error if the response is an error', async () => {
    const badAction = { ...action, url: '?status=badquery' };
    // get a new generator
    const testSaga2 = sagaConstructor(badAction);
    testSaga2.next();
    // simulate a promise rejection
    expect(testSaga2.throw('Server Error').value)
      .toEqual(put(fetchUserApprovalsFailure('Server Error')));
  });
});
