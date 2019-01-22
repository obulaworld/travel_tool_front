import React from 'react';
import NewEmailTemplateForm from '../index';

const props = {
  history: {
    push: jest.fn()
  },
  errors: {},
  isSaving: false,
  createReminderEmailTemplate: jest.fn()
};

const mockData = {
  name: 'Reminder Template',
  from: 'moses.gitau@andela.com',
  cc: ['gitaumoses4@andela.com'],
  subject: 'This is the subject',
  message: 'This is the message'
};

describe('<NewEmailTemplateForm> component', () =>{
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<NewEmailTemplateForm {...props} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<NewEmailTemplateForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not submit without any values in the form', () => {
    wrapper.find('form').simulate('submit');
    expect(props.createReminderEmailTemplate).toHaveBeenCalledTimes(0);
  });

  it('should submit data if all the fields are fields', () => {
    wrapper.setState({values: mockData, hasBlankFields: false});
    wrapper.find('form').simulate('submit');

    expect(props.createReminderEmailTemplate).toHaveBeenCalledWith(mockData, props.history);
  });

  it('should redirect to the reminder setup page on cancel', () => {
    wrapper.find('button').last().simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/settings/reminder-setup');
  });

  it('should display errors when received from the props', () => {
    const errors = { name: 'The name should be more than 3 characters'};
    wrapper.setProps({ errors});
    expect(wrapper.state('errors')).toEqual(errors);
  });
});
