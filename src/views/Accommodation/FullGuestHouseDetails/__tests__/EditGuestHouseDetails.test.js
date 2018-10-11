import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ConnectedGuestHouseDetails, { GuestHouseDetails } from '..';


const props = {
  guestHouse: {
    'id': 'zNnGJAJH5',
    'houseName': 'Bukoto heights',
    'location': 'Kampala',
    'bathRooms': '4',
    'imageUrl': 'https://www.lol.com',
    'createdAt': '2018-10-05T00:07:22.276Z',
    'updatedAt': '2018-10-07T03:17:09.928Z',
    'userId': '-LJNzPWupJiiToLowHq9',
    rooms: [
      {
        'id': 'dtnJtaRE7Y',
        'roomName': 'Rwenzori',
        'roomType': 'non-ensuite',
        'bedCount': '1',
        'faulty': false,
        'createdAt': '2018-10-05T00:07:22.281Z',
        'updatedAt': '2018-10-07T03:17:09.938Z',
        'guestHouseId': 'zNnGJAJH5'
      }
    ],
    bed: [
      [
        {
          'id': 68,
          'bedName': 'bed 1',
          'booked': false,
          'createdAt': '2018-10-07T03:17:09.969Z',
          'updatedAt': '2018-10-07T03:17:09.969Z',
          'roomId': 'dtnJtaRE7Y'
        }
      ]
  
    ]
  },
  fetchAccommodation: sinon.spy(),
  editAccommodation: jest.fn(),
  modalType: null,
  openModal: jest.fn(),
  initFetchTimelineData: jest.fn(),
  closeModal: jest.fn(),
  match: {
    params: { }
  },
  history: {
    push: jest.fn()
  },
  modal: {
    shouldOpen: false,
    modalType: null
  },
  handleOnEdit: jest.fn()
};

describe('<Accommodation />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GuestHouseDetails {...props} />);
  });


  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleOnEdit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleOnEdit');
    wrapper.instance().handleOnEdit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
