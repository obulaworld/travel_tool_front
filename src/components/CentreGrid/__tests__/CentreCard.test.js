import React from 'react';
import { shallow } from 'enzyme';
import CentreCard from '../CentreCard';

const props = {
  cardImage: 'https:someimage.png',
  imageAlt: 'an image',
  countryFlagImage: 'https://countryimage.png',
  guestHouseName: 'Guest House',
  guestHouseLocation: 'Kigali, Rwanda',
  beds: 5,
  bathrooms: 4
};

describe('<CentreCard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CentreCard {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('displays the correct data', () => {
    expect(wrapper.find('.centre__name').text()).toEqual('Guest House');
    expect(wrapper.find('.centre__location').text()).toEqual('Kigali, Rwanda');
    expect(wrapper.find('.centre__name').text()).toEqual('Guest House');
    expect(wrapper.find('.centre__icon-container').at(0).text()).toEqual('5Beds');
    expect(wrapper.find('.centre__icon-container').at(1).text()).toEqual('4Bathrooms');
  });

  it('renders the correct image', () => {
    expect(wrapper.find('.centre__image').prop('src')).toEqual('https:someimage.png');
    expect(wrapper.find('.centre__flag').prop('style')).toEqual({
      backgroundImage: 'url(https://countryimage.png)'
    });
    expect(wrapper.find('.centre__flag').prop('alt')).toEqual('Kigali, Rwanda flag');
  });
});
