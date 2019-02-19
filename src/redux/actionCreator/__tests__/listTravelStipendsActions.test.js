import {
  fetchAllTravelStipends,
  fetchAllTravelStipendsFailure,
  fetchAllTravelStipendsSuccess
} from '../travelStipendsActions';

const mockData = {
  stipends: [
    {
      center: {location: 'Nairobi, Kenya'},
      amount: 345
    },
    {
      center: {location: 'Kampala, Uganda'},
      amount: 345
    }
  ]
};
describe('listTravelStipendsActions', () => {
  it('should return action with type FETCH_TRAVEL_STIPENDS', () => {
    const action = fetchAllTravelStipends();
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS'
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_STIPENDS_SUCCESS', () => {
    const { stipends } = mockData;
    const action = fetchAllTravelStipendsSuccess({stipends});
    const expectedOutput = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS_SUCCESS',
      stipends
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_TRAVEL_STIPENDS_FAILURE', () => {
    const error = { error: {}};
    const action = fetchAllTravelStipendsFailure(error);
    const expectedResult = {
      type: 'FETCH_ALL_TRAVEL_STIPENDS_FAILURE',
      error
    };
    expect(action).toEqual(expectedResult);
  });
});
