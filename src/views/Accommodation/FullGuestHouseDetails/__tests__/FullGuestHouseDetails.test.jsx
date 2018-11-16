import React from 'react';
import {GuestHouseDetails} from '..';

const props = {
  match: {
    params: {
      guestHouseId: 'guest-house-1'
    }
  },
  history: {
    goBack: jest.fn()
  },
  initFetchTimelineData: jest.fn(),
  guestHouse: {
    houseName: 'Ndovu',
    rooms: [{
      beds: [
        {bed1: {
          booked: false,
        },
        bed2: {
          booked: true,
        }}
      ]
    }]
  },
  updateRoomState: jest.fn(),
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const newProps = {
  ...props,
  guestHouse: {
    rooms: []
  }
};

describe('<GuestHouseDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuestHouseDetails {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes to timeline a method that initiates fetching of timeline data', () => {
    const timeline = wrapper.find('Timeline');
    const fetchDataHandler = timeline.prop('fetchTimelineRoomsData');
    fetchDataHandler();
    expect(props.initFetchTimelineData).toHaveBeenCalledTimes(1);
  });

  it('returns zero when there are no guest rooms', () => {
    const zeroWrapper = shallow(<GuestHouseDetails {...newProps} />);
  });
});
