import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TravelChecklistsCard from '../TravelChecklistsCard';

const props = {
  fetchTravelChecklist: jest.fn(),
  trips: [
    {
      departureDate: '2018-09-20',
      origin: 'Lagos',
      destination: 'Kigali, Rwanda',
    }
  ],
  checklistItems: [
    {
      id: 1,
      name: 'passport',
      checklist: [
        {
          id: 1,
          name: 'passport',
          destinationName: 'Kigali, Rwanda'
        }
      ]
    },
    {
      id: 2,
      name: 'ticketDetails',
      checklist: [{
        id: 2,
        name: 'ticketDetails',
        destinationName: 'Lagos, Nigeria',

      }]
    },
    {
      id: 3,
      name: 'visa',
      checklist: [
        {
          id: 3,
          name: 'visa',
          destinationName: 'Lagos, Nigeria',

        }
      ]
    },
    {
      id: 4,
      name: 'visa',
      destinationName: 'Lagos, Nigeria',

    }
  ],
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
    roleId: 401938,
    location: 'New'
  },
  trimmedCheckLists: [{
    trip: {
      destinationName: 'Lagos, Nigeria'
    }
  }],
  isLoading: false,
};
describe('<TravelChecklistsCard />',() => {
  const wrapper = mount(
    <MemoryRouter>
      <TravelChecklistsCard {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should show the loader, while checklist is being fetched', () => {
    const newProps = {
      ...props,
      isLoading: true
    };
    const wrapper = mount(<TravelChecklistsCard {...newProps} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });

  it('should stop showing the loader when checklist is fetched', () =>{
    const wrapper = mount(<TravelChecklistsCard {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });

  it('should render all checkists', () =>{
    const wrapper = mount(<TravelChecklistsCard {...props} />);
    const approvalList = wrapper.find('.approval-list-items');
    expect(approvalList).toHaveLength(1);
    expect(wrapper.find('.checklist-name').at(0).text()).toBe('passport');
    expect(wrapper.find('.checklist-name').at(1).text()).toBe('ticketDetails');
    expect(wrapper.find('.checklist-name').at(2).text()).toBe('visa');
  });
});
