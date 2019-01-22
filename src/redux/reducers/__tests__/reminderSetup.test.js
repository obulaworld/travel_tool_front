import reminderSetupReducer from '../listEmailTemplates';
import {
  fetchAllEmailTemplates,
  fetchAllEmailTemplatesFailure,
  fetchAllEmailTemplatesSuccess
} from '../../actionCreator/listEmailTemplatesActions';
import listOfTemplates from '../../../views/ReminderSetup/__mocks__';


describe('reminder setup reducer', () =>{
  const initialState = {
    templates: [],
    errors:{},
    pagination: {},
    isLoading: false,
  };

  it('returns initial state if action is anonymous', () =>{
    const action = () => ({
      type: 'ANONYMOUS_ACTION'
    });
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(initialState);
  });

  it('sets islLoading to true when action is FETCH_ALL_EMAIL_TEMPLATES', () => {
    const action = fetchAllEmailTemplates('?type=visa');
    const expectedOutput = { ...initialState, isLoading: true };
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('updates state with list of templates if action with type FETCH_ALL_EMAIL_TEMPLATES_SUCCESS', () => {
    const { templates, pagination } = listOfTemplates;
    const action = fetchAllEmailTemplatesSuccess(listOfTemplates);
    const output = reminderSetupReducer(initialState, action);
    const expectedResult = {
      templates,
      errors: {},
      isLoading: false,
      pagination
    };
    expect(output).toEqual(expectedResult);
  });

  it('updates application state with a list of errors', () => {
    const errors = {
      error: 'A server error occurred'
    };
    const action = fetchAllEmailTemplatesFailure(errors);
    const expectedOutput = {
      templates: [],
      errors,
      pagination: {},
      isLoading: false
    };
    expect(reminderSetupReducer(initialState, action)).toEqual(expectedOutput);
  });
});
