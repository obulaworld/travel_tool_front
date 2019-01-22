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

export default {
  payload,
  response,
  errors
};
