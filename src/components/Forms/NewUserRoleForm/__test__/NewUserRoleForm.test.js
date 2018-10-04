import React from 'react';
import moment from 'moment';
import NewUserRoleForm from '../NewUserRoleForm';

describe('<NewUserRoleForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();
  
  const props = {
    user: {
      UserInfo: {
        name: 'John Doe'
      },
    },
    loading: false,
    errors: [],
    getRoleData: jest.fn(() => {}),
    handleUpdateRole:  jest.fn(() => {}),
    onChange: jest.fn()
  };

  const defaultState = {
    values: {
      email: '',
      roleName: '',
    },
    errors: {},
    hasBlankFields: true
  };


  beforeEach(() => {
    wrapper = mount(<NewUserRoleForm {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('picks input values', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        email: 'email',
        value: 'Tomato Guy'
      }
    });
    expect(wrapper.state().values.email).toBe('Tomato Guy');
  });


  it('validates input on blur', () => {
    wrapper.find('input[name="email"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors.email).toBe('This field is required');
  });


  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should render a loading indicator while updating a new role', () => {
    wrapper.setProps({ updatingRole: true });
    expect(wrapper.find('h5').text()).toEqual('Updating role...');
  });


  it('calls on submit when all details are correct', () => {
    wrapper.setState({
      values: {
        email: 'test',
        roleName: 'Requester',
      }
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.state().values.email = 'test';

    expect(props.handleUpdateRole).toHaveBeenCalledWith(wrapper.state().values);//eslint-disable-line
    expect(props.handleUpdateRole).toHaveBeenCalledTimes(1);//eslint-disable-line
  });


  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

});
