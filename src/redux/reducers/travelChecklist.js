import {
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  CREATE_TRAVEL_CHECKLIST,
  CREATE_TRAVEL_CHECKLIST_SUCCESS,
  CREATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_SUCCESS,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  DELETE_TRAVEL_CHECKLIST,
  DELETE_TRAVEL_CHECKLIST_SUCCESS,
  DELETE_TRAVEL_CHECKLIST_FAILURE,
} from '../constants/actionTypes';

export const initialState = {
  isLoading: false,
  updatingChecklist: false,
  creatingChecklist: false,
  fetchingChecklists: false,
  checklistItems: [],
  error: ''
};
const traveChecklist = (state = initialState, action) => {
  let checklistItems;
  switch (action.type) {
  case FETCH_TRAVEL_CHECKLIST:
    return { ...state, isLoading: true };
  case FETCH_TRAVEL_CHECKLIST_SUCCESS:
    return { ...state, isLoading: false, checklistItems: action.travelChecklists, error: '' };
  case FETCH_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, isLoading: false, error: action.error, checklistItems: [] };
  case CREATE_TRAVEL_CHECKLIST:
    return { ...state, creatingChecklist: true };
  case CREATE_TRAVEL_CHECKLIST_SUCCESS:
    return {
      ...state,
      creatingChecklist: false,
      checklistItem: action.checklistItem,
      error: ''
    };
  case CREATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, creatingChecklist: false, error: action.error };
  case UPDATE_TRAVEL_CHECKLIST:
    return { ...state, updatingChecklist: true };
  case UPDATE_TRAVEL_CHECKLIST_SUCCESS:
    checklistItems = state.checklistItems.map(item => action.checklistItemId === item.id && action.updatedChecklistItem || item);
    return { ...state, checklistItems: [...checklistItems], updatingChecklist: false };
  case UPDATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, updatingChecklist: false, error: action.error };
  case DELETE_TRAVEL_CHECKLIST:
    return {
      ...state,
      deletingChecklist: true,
      error: ''
    };
  case DELETE_TRAVEL_CHECKLIST_SUCCESS:
    return {
      ...state,
      deletingChecklist: false,
      error: ''
    };
  case DELETE_TRAVEL_CHECKLIST_FAILURE:
    return {
      ...state,
      deletingChecklist: false,
      error: action.error
    };
  default: return state;
  }
};

export default traveChecklist;
