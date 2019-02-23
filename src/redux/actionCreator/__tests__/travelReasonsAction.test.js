import * as types from '../../constants/actionTypes';
import * as actions from '../travelReasonsActions';

describe('Travel Reasons actions', () => {
  describe('Create new Travel Reasons', () => {
    it('should return action type CREATE_TRAVEL_REASON', () => {
      const body = {
        title: 'title',
        description: 'description'
      };
      const expectedAction = {
        type: types.CREATE_TRAVEL_REASON,
        body
      };

      const action = actions.createTravelReason(body);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type CREATE_TRAVEL_REASON_SUCCESS', () => {
      const response = {
        id: 1,
        error: {},
        travelReason: {}
      };
      const expectedAction = {
        type: types.CREATE_TRAVEL_REASON_SUCCESS,
        response,
      };

      const action = actions.createTravelReasonSuccess(response);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type CREATE_TRAVEL_REASON_FAILURE', () => {
      const error = 'Error creating travel reason';
      const expectedAction = {
        type: types.CREATE_TRAVEL_REASON_FAILURE,
        error,
      };

      const action = actions.createTravelReasonFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('View Travel Reason Details', () => {
    it('should return action type VIEW_TRAVEL_REASON_DETAILS', () => {
      const id = 1;
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS,
        id
      };

      const action = actions.viewTravelDetails(id);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VIEW_TRAVEL_REASON_DETAILS_SUCCESS', () => {
      const response = {
        id: 1,
        title: 'title',
        description: 'description'
      };
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
        response,
      };

      const action = actions.viewTravelDetailsSuccess(response);
      expect(action).toEqual(expectedAction);
    });

    it('should return action type VIEW_TRAVEL_REASON_DETAILS_FAILURE', () => {
      const error = 'Error retrieving travel reason details';
      const expectedAction = {
        type: types.VIEW_TRAVEL_REASON_DETAILS_FAILURE,
        error,
      };

      const action = actions.viewTravelDetailsFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
