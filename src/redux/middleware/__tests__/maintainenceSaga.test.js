import { call } from 'redux-saga/effects';
import moxios from 'moxios';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import MaintainaceApi from '../../../services/MaintainaceApi';
import { ADD_MAINTENANCE_RECORD } from '../../constants/actionTypes';
import maintenanceAction from '../../actionCreator/maintenanceAction';
import {watchAddMainteinanceAsync} from '../maintenanceSaga';


describe('Maintainence record saga', () => {
  const action ={
    data: {
      'reason':'a nigga died',
      'start':'10/28/2018',
      'end':'2018-10-16'
    },
    roomId:'yjhk54yew',
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  const roomId = 'yjhk54yew';

  it('Adds maintainence record to the database', () => {
    moxios.stubRequest(`${baseUrl}/room/${roomId}/maintainance`, {
      status: 201,
      response:
      {
        'success': true,
        'message': 'Room maintainance record created',
        'maintainance': {
          'id': 30,
          'reason': 'a nigga died',
          'start': '2018-10-28',
          'end': '2018-10-16',
          'roomId': 'room-id-1',
          'updatedAt': '2018-10-17T15:46:01.851Z',
          'createdAt': '2018-10-17T15:46:01.851Z'
        }
      }
    });

    return expectSaga(watchAddMainteinanceAsync, MaintainaceApi)
      .provide([[call(MaintainaceApi.addMaintainanceRecord, action.roomId), action.data]])
      .dispatch({
        type: 'ADD_MAINTENANCE_RECORD',
        response: action.data,
        roomId: action.roomId,
      })
      .run();
  });
});
