import React from 'react';
import TimelineVerticalAxis from '..';

const props = {
  rooms: [{
    roomName: 'Ndovu',
    id: 'room-id-1',
    faulty: false,
    beds: [{
      bedName: 'Kitanda 1',
      id: 'Kitanda1'
    }],
  }],
  updateRoomState: jest.fn(),
  timelineDateRange: ['2018-01-01', '2018-01-31'],
  guestHouseId: 'guest-house-id-1',
  openModal: jest.fn(),
  closeModal: jest.fn(),
  addmaintenanceRecord: jest.fn(),
  updateMaintenanceRecord: jest.fn(),
  shouldOpen: true,
  modalType: 'Menengai-room-id-1'
};

describe('<TimelineVerticalAxis />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <TimelineVerticalAxis {...props} />
    );
  });

  it('renders properly without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
