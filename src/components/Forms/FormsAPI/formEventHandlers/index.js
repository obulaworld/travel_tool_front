// This is used by the  Input component to generate event handlers
/*
  eventHandlers will update the form and validate the input based on the validate logic in the form.
*/
import * as handlerCreators from './eventHandlerCreators';

const createEventHandlersFor = (targetForm, targetField, validatorName) => {
  // creates every event handler for a form
  let eventHandlers = {};
  const _handlerCreators = {
    handleSelectDropdown: handlerCreators.getDropdownHandler,
    handleSelectTogglerOpt: handlerCreators.getTogglerHandler,
    handleInputBlur: handlerCreators.getOnBlurHandler,
    handleSelectDate: handlerCreators.getDateHandler,
    handleInputChange: handlerCreators.getInputChangeHandler
  };
  // call the creators in _handlerCreators to create the handlers for the target form and store them in eventHandlers
  for(let handlerName of Object.keys(_handlerCreators)) {
    eventHandlers[handlerName] = _handlerCreators[handlerName].call(
      targetForm,
      targetForm[validatorName || 'validate'],
      targetField
    );
  }
  return eventHandlers;
};

export default createEventHandlersFor;
