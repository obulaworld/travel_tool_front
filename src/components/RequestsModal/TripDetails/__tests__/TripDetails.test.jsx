import React from 'react';
import TripDetails from '..';

describe('<TripDetails />', () => {
  let wrapper, tripDetails;

  beforeEach(() => {
    tripDetails = {
      'origin': 'Lagos',
      'destination': 'Nairobi',
      'departureDate': '2018-12-09',
      'arrivalDate': '2018-12-11',
      'createdAt': '2018-08-15T11:11:52.181Z'
    };
    wrapper = mount(
      <TripDetails tripDetails={tripDetails} />
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
