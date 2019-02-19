import {
  createTravelStipend,
  createTravelStipendSuccess,
  createTravelStipendFailure,
} from '../travelStipendsActions';
  
describe('TravelStipends Actions', () => {
  
  describe('Create TravelStipends Actions', () => {
    it('should return action of type CREATE_TRAVEL_STIPEND', () => {
      const requestData = {
        center: 'Kigali, Rwanda',
        stipend: 45678,
      };
  
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND',
        requestData: {
          center: 'Kigali, Rwanda',
          stipend: 45678,
        },
        closeRequestModal: undefined
      };
      const newAction = createTravelStipend(requestData);
      expect(newAction).toEqual(receivedAction);
    });
  
    it('should return action of type CREATE_TRAVEL_STIPEND_SUCCESS', () => {
      const newStipend = {
        center: 'Kigali, Rwanda',
        stipend: 45678,
      };
  
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
        newStipend: {
          center: 'Kigali, Rwanda',
          stipend: 45678,
        }
      };
      const newAction = createTravelStipendSuccess(newStipend);
      expect(newAction).toEqual(receivedAction);
    });
  
    it('should return action of type CREATE_TRAVEL_STIPEND_FAILURE', () => {
      const error = 'Could not create a new stipend';
      const receivedAction = {
        type: 'CREATE_TRAVEL_STIPEND_FAILURE',
        error: 'Could not create a new stipend'
      };
      const newAction = createTravelStipendFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
  
});
  
