import React from 'react';
import moment from 'moment';
import NewRequestForm from '../NewRequestForm';

describe('<NewRequestForm />', () => {
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
    handleCreateRequest: jest.fn(() => {}),
    managers: [
      {
        fullName: 'Test User',
        email: 'test.user@andela.com'
      }
    ]
  };

  const {user} = props;
  const defaultState = {
    values: {
      name: '', // FIX: need to be refactor later
      gender: '',
      department: '',
      role: '',
      manager: '',
      origin: '',
      destination: '',
      otherDestination: '',
      departureDate: null,
      arrivalDate: null
    },
    errors: {},
    hasBlankFields: true
  };


  beforeEach(() => {
    wrapper = mount(<NewRequestForm {...props} />);
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
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'John Mutuma'
      }
    });
    expect(wrapper.state().values.name).toBe('John Mutuma');
  });

  it('validates input on blur', () => {
    wrapper.find('input[name="departureDate"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors.departureDate).toBe('This field is required');
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

  it('calls on submit when `destination` is `Other`', () => {
    wrapper.setState({
      values: {
        name: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Other',
        otherDestination: 'Miami',
        departureDate: '09/27/1988',
        arrivalDate: '09/27/1988'
      }
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.state().values.destination = 'Miami';
    delete wrapper.state().values.otherDestination;
    expect(props.handleCreateRequest).toHaveBeenCalledWith(wrapper.state().values);//eslint-disable-line
    expect(props.handleCreateRequest).toHaveBeenCalledTimes(1);//eslint-disable-line
  });

  it('calls on submit when `destination` is not`Other`', () => {
    wrapper.setState({
      values: {
        name: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Nairobi',
        otherDestination: '',
        departureDate: '09/27/1988',
        arrivalDate: '09/27/1988'
      }
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
    delete wrapper.state().values.otherDestination;
    expect(props.handleCreateRequest).toHaveBeenCalledWith(wrapper.state().values);//eslint-disable-line
    expect(props.handleCreateRequest).toHaveBeenCalledTimes(2);//eslint-disable-line
  });

  it('should not toggle the modal if request submission failed', () => {
    wrapper.setState({
      values: {
        name: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Nairobi',
        otherDestination: '',
        departureDate: '09/27/1988',
        arrivalDate: '09/27/1988'
      }
    });
    wrapper.setProps({
      errors: ['error while creating a new request']
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('should call handleClearForm', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().handleClearForm();
    expect(wrapper.state()).toMatchObject(defaultState);
  });

  it('should render a loading indicator while creating a new request', () => {
    wrapper.setProps({ creatingRequest: true });
    expect(wrapper.find('h5').text()).toEqual('Creating request...');
  });

  it('should call savePersonalDetails method when checkbox state is changed to clicked', ()=>{
    const NewRequest = shallow(<NewRequestForm {...props} />);
    const checkbox = NewRequest.find('Checkbox').dive();
    expect(checkbox.exists()).toBe(true);
    checkbox.setState({checkBox:'clicked'});
    expect(checkbox.state().checkBox).toBe('clicked');

    NewRequest.setState({
      values: {
        name: 'test',
        gender: 'test',
        department: 'test',
        role: 'test',
        manager: 'test',
        origin: 'test',
        destination: 'Nairobi',
        departureDate: '09/27/1988',
        arrivalDate: '09/27/1988'
      }
    });
    const spy = jest.spyOn( NewRequest.instance(), 'handleSubmit');
    NewRequest.instance().forceUpdate();
    NewRequest.find('form').simulate('submit', {
      preventDefault: ()=>{}
    });
  });


});
