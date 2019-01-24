import reminderSetupReducer from '../listEmailTemplates';
import {
  fetchAllEmailTemplates,
  fetchAllEmailTemplatesFailure,
  fetchAllEmailTemplatesSuccess
} from '../../actionCreator/listEmailTemplatesActions';
import {
  enableReminderEmailTemplateSuccess,
} from '../../actionCreator/reminderManagementActions';
import templates from  '../../../views/ReminderSetup/__mocks__';
import {fetchTemplate } from '../../actionCreator/templatedetailsAction';

const { listOfTemplates, allTemplates } = templates;

describe('reminder setup reducer', () =>{
  const initialState = {
    selectedTemplate: {
      id: 1
    },
    templates: [
      {
        id: 1
      }
    ],
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

  it('sets selected template', () =>{
    const action=fetchTemplate(1);
    const expectedOutput = {...initialState};
    const output = reminderSetupReducer(initialState, action);
    expect(output).toEqual(expectedOutput);
  });

  it('updates state with list of templates if action with type FETCH_ALL_EMAIL_TEMPLATES_SUCCESS', () => {
    const { templates, pagination } = listOfTemplates;
    const action = fetchAllEmailTemplatesSuccess(listOfTemplates);
    const output = reminderSetupReducer(initialState, action);
    const expectedResult = {
      selectedTemplate: {
        id: 1
      },
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
      selectedTemplate: {
        id: 1
      },
      templates: [
        {
          id: 1
        }
      ],
      errors,
      pagination: {},
      isLoading: false
    };
    expect(reminderSetupReducer(initialState, action)).toEqual(expectedOutput);
  });
  it('updates state with disabled template if action with type ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS', () => {
    const { templates } = listOfTemplates;
    templates[0].disabled = true;
    const action = enableReminderEmailTemplateSuccess(templates[0], 'Reason');
    const output = reminderSetupReducer(allTemplates, action);
    const expectedResult = {
      templates,
      isLoading: false,
    };
    expect(output).toEqual(expectedResult);
  });
});
