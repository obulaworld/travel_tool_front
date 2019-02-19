import React from 'react';
import NewTravelStipendForm from '../NewTravelStipendForm';
import profileMock from '../../ProfileForm/__mocks__';


const { centers } = profileMock;

describe('<NewTravelStipendForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  const props = {
    loading: false,
    travelStipends: { isLoading: false },
    hasBlankFields: false,
    user: {
      UserInfo: {
        id: '-LJNw1BsT0LP_E4l2peP',
        name: 'Collins',
      }
    },
    userData:{
      id: '2',
      fullName: 'Collins Muru',
      name: 'Collins',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins',
      department: 'Talent & Development',
      occupation: 'Software Developer',
      manager: 'Collins',
      gender: 'Male',
      createdAt: '2018-09-14T12:48:11.266Z',
      updatedAt: '2018-09-16T07:53:48.835Z',
      roleId: 401938
    },
    userDataUpdate:[],
    handleCreateTravelStipend: jest.fn(() => {}),
    closeModal: jest.fn(),
    choices: ['kigali', 'nairobi'],
    modalType:'create travel stipend',
    centers
  };


  beforeEach(() => {
    wrapper = mount(<NewTravelStipendForm {...props} />);
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders two fieldsets', () => {
    const fieldsets = wrapper.find('fieldset');
    expect(fieldsets).toHaveLength(2);
  });

  it('renders the travel stipend fieldset', () => {
    const travelStipendDetails = wrapper.find('fieldset .submit-area');
    expect(travelStipendDetails).toHaveLength(1);
  });

  it('renders two buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  it('checks that onSubmit is not called when form is empty', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});

