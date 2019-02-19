import listAlltravelStipends from '../travelStipends';
import {
  fetchAllTravelStipends,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess
} from '../../actionCreator/travelStipendsActions';
import mockData from '../../../mockData/travelStipend';

describe('TravelStipendsReducer', () => {
  const initialState = {
    error: {},
    stipends: [],
    isLoading: false
  };
  it('returns initial state on an undefined action', () => {
    const action = () => ({
      type: ''
    });
    const newState = listAlltravelStipends(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('sets isLoading to true when action is FETCH_ALL_TRAVEL_STIPENDS', () => {
    const action = fetchAllTravelStipends();
    const newState = listAlltravelStipends(initialState, action);
    const expectedState = {...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  it('updates state with new travelStipends if action is FETCH_ALL_TRAVEL_STIPENDS_SUCCESS'
    , () => {
      const { stipends} = mockData;
      const action = fetchAllTravelStipendsSuccess(stipends);
      const newState = listAlltravelStipends(initialState, action);
      const expectedState = {...initialState, stipends:action.stipends };
      expect(newState).toEqual(expectedState);
    });

  it('updates state with an error if action is FETCH_ALL_TRAVEL_STIPENDS_FAILURE'
    , () => {
      const error = 'An error occured while fetching your request';
      const action = fetchAllTravelStipendsFailure(error);
      const newState = listAlltravelStipends(initialState, action);
      const expectedState = {...initialState, error: action.error };
      expect(newState).toEqual(expectedState);
    });
});
