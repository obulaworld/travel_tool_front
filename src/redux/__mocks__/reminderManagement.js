export const payload= {
  name: 'Reminder Template',
  from: 'moses.gitau@andela.com',
  cc: ['gitaumoses4@andela.com'],
  subject: 'This is the subject',
  message: 'This is the message'
};

export const response = {
  data: {
    success: false,
    message: 'Reminder Email Template created successfully',
    reminderEmailTemplate: {...payload}
  }
};

export const errors = [{
  message : 'The name should be more than 5 characters',
  name: 'name'
}];

export const enableResponse = {
  data: {
    success: true,
    message: 'Reminder email template has been successfully enabled',
    updatedTemplate: {
      name: 'jxdddddddddddddd',
    },
  }
};

export const enableErrors = [{
  message : 'Possible network error',
}];

export const disablePayload = {
  template: {},
  reason: 'Not needed anymore'
};

export const disableResponse = {
  data: {
    success: false,
    message: 'Reminder Email Template successfully disabled',
    updatedTemplate: {
      disable: true,
      reason: disablePayload
    },
    reason: disablePayload.reason
  }
};

export const disableErrors = [{
  message : 'The reason is required',
  reason: 'reason'
}];

export default {
  payload,
  response,
  errors
};
