import React from 'react';
import moment from 'moment';
import TravelDetails from '../TravelDetails';
import beds from '../../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const props = {
  parentIds: 1,
  selection: 'multi',
  addNewTrip: jest.fn(),
  fetchAvailableRooms: jest.fn(),
  values: {
    gender: 'Male',
    ['destination-1']: 'Lagos',
    ['departureDate-1']: moment('2019-10-20'),
    ['arrivalDate-1']: moment('2019-10-30'),
    ['bed-1']: 1
  },
  handleDate: jest.fn(),
  handlePickBed: jest.fn(() => {props.bed = 'bed-0';}),
  removeTrip: jest.fn(),
  availableRooms:{ beds }
};

const setup = (props) => shallow(<TravelDetails {...props} />);

describe('<TravelDetails />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchAvailableRooms when fetchRoomsOnFocus is triggered', () => {
    const wrapper = setup(props);
    const fetchRoomsOnFocusSpy = jest.spyOn(wrapper.instance(), 'fetchRoomsOnFocus');
    wrapper.instance().fetchRoomsOnFocus(props.values, 1, props.selection);
    expect(fetchRoomsOnFocusSpy).toHaveBeenCalled();
  });

  it('should render properly if no available beds', () => {
    const newProps = {...props};
    newProps.availableRooms = {beds: []};
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should render properly if selection is oneWay', () => {
    const newProps = {...props};
    newProps.selection = 'oneWay';
    delete newProps.values['arrivalDate-1'];
    delete newProps.values['bed-1'];
    const wrapper = setup(newProps);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.bed-0').length).toBe(0);
  });
  it('should render properly if selection is return', () => {
    const newProps = {...props};
    newProps.selection = 'return';
    const values = props.values;
    newProps.values = {...values, ['arrivalDate-1']: moment('2019-10-30'), ['bed-1']: 1};
    const wrapper = setup(props);
    wrapper.setProps(newProps);
    expect(wrapper.length).toBe(1);
    const handleOnFocus = jest.spyOn(wrapper.instance(), 'fetchRoomsOnFocus');
    wrapper.find('.bed-0').simulate('change');
    wrapper.find('.bed-0').simulate('focus');
    expect(handleOnFocus).toHaveBeenCalledTimes(1);
  });
});
