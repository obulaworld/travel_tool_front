import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Accommodation, mapStateToProps } from '..';
import guestHouses from '../__mocks__/mockData/guestHouses';

const props = {
  guestHouses,
  fetchAccommodation: sinon.spy(),
  isLoading: false
};

describe('<Accommodation />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Accommodation {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls the fetchAccommodation method
      on componentDidMount`, () => {
    const { fetchAccommodation } = props;
    expect(fetchAccommodation.called).toEqual(true);
  });

  it('renders the right number of centres', () => {
    const CentreGridWrapper = wrapper.find('WithLoading').dive()
      .find('CentreGrid');
    expect(CentreGridWrapper.dive().find('CentreCard').length).toBe(4);
  });
});

describe('mapStateToProps', () => {
  it('returns the correct props', () => {
    const state = {
      accommodation: {
        guestHouses,
        isLoading: false
      }
    }
    const expectedProps = mapStateToProps(state);
    expect(expectedProps).toEqual(state.accommodation);
  })
});


