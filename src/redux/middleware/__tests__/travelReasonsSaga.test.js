import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { watchCreateTravelReason } from '../travelReasonsSaga';
import TravelReasonsAPI from '../../../services/TravelReasonsAPI';
import { closeModal } from '../../actionCreator/modalActions';
import {
  CREATE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE,
} from '../../constants/actionTypes';

const body = {
  title: 'title',
  description: 'description'
};

const newReason = {
  title: body.title,
  description: body.description,
  createdBy: 1,
};

const history = {
  push: jest.fn()
};
// closeModal = jest.fn();
describe('Travel reasons Saga', () => {
  it('gets a response with travel reasons and dispatches CREATE_TRAVEL_REASON_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'success',
        newReason
      }
    };
    return expectSaga(watchCreateTravelReason)
      .provide([[call(TravelReasonsAPI.createTravelReasons, body), response]])
      .dispatch({
        type: CREATE_TRAVEL_REASON,
        body,
        history
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = {
      response: {
        data: {
          status: 500,
          message: 'Server error, try again'
        }
      }
    };
    return expectSaga(watchCreateTravelReason)
      .provide([[call(TravelReasonsAPI.createTravelReasons, body), throwError(error)]])
      .dispatch({
        type: CREATE_TRAVEL_REASON,
        body,
        history
      })
      .silentRun();
  });
});
