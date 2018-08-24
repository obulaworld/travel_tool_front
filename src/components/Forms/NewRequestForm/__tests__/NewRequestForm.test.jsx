import React from 'react';
import moment from 'moment';
import NewRequestForm from '../NewRequestForm';

describe('<NewRequestForm />', () => {
  let wrapper, onSubmit;
  const props = {
    user: {
      UserInfo: {
        name: ''
      }
    }
  };
  const {user} = props;
  const defaultState = {
    values: {
      fullname: user ? user.UserInfo.name : '', // FIX: need to be refactor later
      gender: '',
      department: '',
      role: '',
      manager: '',
      origin: '',
      destination: '',
      otherDestination: '',
      departureDate: null,
      returnDate: null
    },
    errors: {},
    hasBlankFields: true
  };

  beforeEach(() => {
    onSubmit = jest.fn();
    const user = {
      UserInfo: {
        name: 'John Doe'
      }
    };
    wrapper = mount(<NewRequestForm user={user} handleCreateRequest={onSubmit} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders three fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(3);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('renders the travel details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.travel-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('renders four buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(4);
  });

  it('picks input values', () => {
    wrapper.find('input[name="fullname"]').simulate('change', {
      target: {
        name: 'fullname',
        value: 'John Mutuma'
      }
    });
    expect(wrapper.state().values.fullname).toBe('John Mutuma');
  });

  it('validates input on blur', () => {
    wrapper.find('input[name="manager"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors.manager).toBe('This field is required');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('selects female gender on button click', () => {
    let femaleButton = wrapper.find('button[data-value="Female"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Female'
        }
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('selects male gender on button click', () => {
    let maleButton = wrapper.find('button[data-value="Male"]');
    maleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Male'
        }
      }
    });

    expect(wrapper.state('values').gender).toBe('Male');
  });

  it('selects gender with browsers that do not support custom datasets', () => {
    let femaleButton = wrapper.find('button[data-value="Female"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: attrib => 'Female'
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('hides other destination field by default', () => {
    const otherDestination = wrapper.find('.form-input.other-dest--hidden');
    expect(otherDestination).toHaveLength(1);
  });

  it('shows other destination field when destination is Other', () => {
    wrapper
      .find('.input[name="destination"]')
      .find('li:last-child') // Other option
      .find('div[role="button"]')
      .simulate('click');
    const otherDestinationInput = wrapper
      .find('Input')
      .filterWhere(input => {
        return input.prop('name') === 'otherDestination';
      })
      .at(0);
    expect(otherDestinationInput.prop('className')).not.toContain('hidden');
  });

  it('calls on submit', () => {
    wrapper.setState({
      values: {
        fullname: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Other',
        otherDestination: 'Miami',
        departureDate: moment(),
        returnDate: moment()
      }
    });

    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call handleCancel', ()=> {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().handleCancel();
    expect(wrapper.state()).toMatchObject(defaultState)
  });
});
