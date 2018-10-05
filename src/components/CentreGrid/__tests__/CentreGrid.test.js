import React from 'react';
import { shallow } from 'enzyme';
import WithLoadingCentreGrid, { CentreGrid } from '..';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

const props = {
  guestHouses
};

describe('<CentreGrid />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CentreGrid {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the right number of centres', () => {
    expect(wrapper.find('CentreCard').length).toBe(4);
  });

  it('renders a div with text when there are no centres', () => {
    wrapper.setProps({
      guestHouses: []
    });
    expect(wrapper.find('CentreCard').length).toBe(0);
    expect(wrapper.find('.table__requests--empty').text())
      .toEqual('No accommodation centres at the moment');
  });

  it(`renders a div with error when there is an
    error fetching accommodation`, () => {
    wrapper.setProps({
      guestHouses: null,
      error: 'Error fetching accommodation'
    });
    expect(wrapper.find('CentreCard').length).toBe(0);
    expect(wrapper.find('.table__requests--error').text())
      .toEqual('Error fetching accommodation');
  });

  it('passes the right props to the CentreCard component', () => {
    const expectedProps = {
      bathrooms: 3,
      beds: 5,
      cardImage:'http://images/guest-house.jpg',
      countryFlagImage: 'https://www.countryflags.io/KE/flat/64.png',
      guestHouseLocation: 'Nairobi, Kenya',
      guestHouseName: 'Guest House 2',
      imageAlt: 'Guest House 2 image',
      guesthouseId: 'wrtnytom_9',
    };
    const secondExpectedProps = {
      bathrooms: 4,
      beds: 4,
      cardImage:'http://images/guest-house.jpg',
      countryFlagImage: 'https://www.countryflags.io/KE/flat/64.png',
      guestHouseLocation: 'Lagos, Nigeria',
      guestHouseName: 'Guest House 3',
      imageAlt: 'Guest House 3 image',
      guesthouseId: 'bytrwqjk9',
    };
    const secondCentre = wrapper.find('CentreCard').at(1);
    const thirdCentre = wrapper.find('CentreCard').at(2);
    expect(secondCentre.props()).toEqual(expectedProps);
    expect(thirdCentre.props()).toEqual(secondExpectedProps);
  });

  it('renders a preloader when the accommodation is fetching', () => {
    wrapper = shallow(<WithLoadingCentreGrid {...{...props, isLoading: true}} />);
    expect(wrapper.find('Preloader').length).toBe(1);
    expect(wrapper.find('CentreCard').length).toBe(0);
  });
});
