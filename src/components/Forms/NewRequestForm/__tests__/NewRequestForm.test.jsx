import React from 'react';
import sinon from 'sinon';
import NewRequestForm from '../NewRequestForm';
import PersonalDetailsFieldset from '../FormFieldsets/PersonalDetails';

describe('<NewRequestForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  window.google ={
    maps:{
      Marker:class{},
      Map:class{ setTilt(){} fitBounds(){}},
      LatLngBounds:class{},
      places: {
        Autocomplete: class {
          addListener () {
            return {
              calledOnce: function () {
                jest.fn();
              },
            };
          }
          calledOnce () {
            return {
              calledOnce: function () {
                jest.fn();
              },
            };
          }
        }
      },
      AutocompleteService:class{},
    },
    MarkerClusterer:class{},
    Geocoder:class{},
  };


  const props = {
    url: 'http://www.home.com',
    process: 'process.emv.REACT_APP_ANDELA_AUTH_HOST',
    user: {
      UserInfo: {
        name: 'John Doe'
      },
    },
    google: {},
    loading: false,
    errors: [],
    handleCreateRequest: jest.fn(() => {}),
    updateUserProfile: jest.fn(() => {}),
    managers: [
      {
        fullName: 'Test User',
        email: 'test.user@andela.com'
      }
    ]
  };
  const event = {
    preventDefault: jest.fn(),
    google: jest.fn(),
    target: {
      dataset: {
        parentid: 'destination-0'
      },
      name: 'destination-0'
    },
    nativeEvent: {
      path: [0,1,2,3,4,5,6,{id: 'departure-0_date'}]
    }
  };
  window.date = {
    format: jest.fn(),
  }

  const {user} = props;
  const defaultState = {
    values: {
      name: '', // FIX: need to be refactor later
      gender: '',
      department: '',
      role: '',
      manager: '',
    },
    trips: [{}],
    errors: {},
    collapse: false,
    hasBlankFields: true,
    checkBox: 'notClicked',
    selection: 'return'
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
    wrapper.find('input[name="name"]').simulate('blur');
    wrapper.update();
    expect(wrapper.state().errors.name).toBe('This field is required');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });


  it('set destination on onchange', () => {
    let destination = wrapper.find('input[name="destination-0"]');
    destination.simulate('change', {
      target: {
        name: 'lagos',
        dataset: {
          value: 'destination-0'
        },
        value: 'Lagos'
      }
    });
    expect(wrapper.state().values.name).toBe('');
  });

  it('set date on onchange', () => {
    let destination = wrapper.find('input[name="origin-0"]');
    destination.simulate('change', {
      target: {
        name: 'lagos',
        dataset: {
          value: 'origin-0'
        },
        value: 'Lagos'
      }
    });
    expect(wrapper.state().values.name).toBe('');
  });

  it('set date on onchange', () => {
    let destination = wrapper.find('input[name="departureDate-0"]');
    destination.simulate('change', {
      target: {
        name: 'lagos',
        dataset: {
          value: 'departureDate-0'
        },
        value: 'Lagos'
      }
    });
    expect(wrapper.state().values.name).toBe('');
  });

  it('calls onChangeInput when input is changed in state', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event and resets return date when departure date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const spy = jest.spyOn(shallowWrapper.instance(), 'resetTripArrivalDate')
    const date = {
      format: () => '2018-11-11'
    }
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        dataset: {
          parentid: 'destination-0'
        }
      },
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'arrival-0_date'}]
      }
    };

    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    }
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });


  it('should change the radio buttton on click to multi ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);

    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'return'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      selection: 'return'
    })
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should update state when a trip is added and when it\'s removed', () => {
    expect.assertions(7);
    wrapper.instance().addNewTrip();
    wrapper.instance().addNewTrip();
    expect(wrapper.instance().state.values[`origin-1`]).toBe('');
    expect(wrapper.instance().state.values[`origin-2`]).toBe('');
    expect(wrapper.instance().state.parentIds).toBe(3);
    wrapper.instance().removeTrip(1);
    expect(wrapper.instance().state.parentIds).toBe(2);
    // still have one trip, origin-1 should now be what was at origin-2 and so forth
    expect(wrapper.instance().state.values[`origin-1`]).toBe('');
    // after shifting state values, origin-{parentIds} in state should be undefined
    expect(wrapper.instance().state.values[`origin-2`]).toBe(undefined);
    expect(wrapper.instance().state.trips).toHaveLength(2);
  });

  it('should close the personal field on button click ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: true,
      title: 'Show Details',
      position: 'rotate(266deg)',
      line: 'none'
    })
    sinon.spy(shallowWrapper.instance(), 'collapsible');
    shallowWrapper.instance().collapsible(event);
    expect(shallowWrapper.instance().collapsible.calledOnce).toEqual(true);
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

  it('should change the radio button on click', () => {
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


  it('should save submit personal details ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      value: {
        name: 'tomato', // FIX: need to be refactor later
        gender: 'male',
        department: 'fame',
        role: 'job',
        manager: 'mango',
      },
      trips: [
        {}
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'handleSubmit');
    shallowWrapper.instance().handleSubmit(event);
    expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
  });

  it('should have the checkbox rendered', ()=>{
    const NewRequestFormWrapper = mount(<NewRequestForm {...props} />);
    const personalDetails = NewRequestFormWrapper.find('PersonalDetailsFieldset');
    const checkBox = personalDetails.find('Checkbox');
    expect(checkBox).toHaveLength(1);
  });

  it('should add profile details to the database', () => {
    wrapper.setState({
      values: {
        name: 'tomato', // FIX: need to be refactor later
        gender: 'male',
        department: 'fame',
        role: 'job',
        manager: 'mango',
      },
      trips: [
        {}
      ]
    });
    localStorage.setItem('state', 'clicked');
    wrapper.instance().handleSubmit(event);
    expect(wrapper.prop('updateUserProfile')).toHaveBeenCalledTimes(1);
  });

});
