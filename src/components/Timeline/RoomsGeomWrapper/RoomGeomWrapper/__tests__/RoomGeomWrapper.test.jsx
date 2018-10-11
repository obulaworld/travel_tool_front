import React from 'react';
import RoomGeomWrapper from '..';
import moment from 'moment';

const props = {
  beds: [{
    bedName: 'kitanda 1',
    bedId: 1
  }],
  timelineStartDate: moment().startOf('month'),
  tripDayWidth: 31,
  timelineViewType: 'month',
  status: false
};

describe('<RoomGeomWrapper />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RoomGeomWrapper {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a wrapper for all bed geometries', () => {
    const roomGeomWrapper = wrapper.find('.room-geometry-wrapper');
    expect(roomGeomWrapper).toHaveLength(1);
  });

  it('renders passes available beds through bed geometries', () => {
    const bedGeometries = wrapper.find('BedGeomWrapper');
    expect(bedGeometries).toHaveLength(1);
  });
});
