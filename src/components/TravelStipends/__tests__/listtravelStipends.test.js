import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ListTravelStipends from '../TravelStipends';
import mockData from '../../../mockData/travelStipend';


describe('<ListTravelStipends />',() => {
  const { stipends }  = mockData;
  const props = {
    fetchAllTravelStipends: jest.fn(),
    listAllTravelStipends: {stipends}
  };
  const props2 = {
    fetchAllTravelStipends: jest.fn(),
    listAllTravelStipends: {
      stipends: []
    }
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListTravelStipends {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders without crashing', () => {
    const wrapper2 = mount(
      <MemoryRouter>
        <ListTravelStipends {...props2} />
      </MemoryRouter>
    );
    expect(wrapper2.find('.no-templates').length).toEqual(1);
  });
});


