import React from 'react';
import TripGeometry from '..';

const props = {
  trip: {
    departureDate: '2018-01-01',
    returnDate: '2018-01-07',
    request: {
      name: 'John Doe',
      gender: 'Male'
    }
  },
  tripDayWidth: 31
};

const bookingDetailsPosEvent = {
  target: {
    getBoundingClientRect: jest.fn(() => ({
      left: 200,
    }))
  },
  clientX: 300
};

describe('<TripGeometry />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TripGeometry {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('timeline trip geometry', () => {
    let timelineTripGeom, blurFocusSpy;
    beforeEach(() => {
      timelineTripGeom = wrapper.find('.timeline-trip-geometry');
      blurFocusSpy = jest.spyOn(wrapper.instance(), 'toggleBookingDetails');
    });

    it('renders the timeline trip geometry', () => {
      expect(timelineTripGeom).toHaveLength(1);
    });

    it('ignore tab focus on trip bar to prevent distorted positioning', () => {
      expect(timelineTripGeom.prop('tabIndex')).toEqual('-1');
    });

    describe('booking details toggling', () => {
      let onFocusHandler, onBlurHandler, bookingDetailsPosHandler;
      beforeEach(() => {
        onFocusHandler = timelineTripGeom.prop('onFocus');
        onBlurHandler = timelineTripGeom.prop('onBlur');
        bookingDetailsPosHandler = timelineTripGeom.prop('onClick');
      });

      it('lauches with booking details hidden', () => {
        expect(wrapper.state().bookingDetailsVisible).toBe(false);
      });

      it('calls booking details toggler on mouse focus with right arg(s)', () => {
        onFocusHandler();
        expect(blurFocusSpy).toHaveBeenCalledWith('open');
      });

      it('calls booking details toggler on blur with right arg(s)', () => {
        onBlurHandler();
        expect(blurFocusSpy).toHaveBeenCalledWith('close');
      });

      describe('toggle booking details handler works properly', () => {
        it('leaves the booking details open when clicked severally', () => {
          expect.assertions(2);
          onFocusHandler(); //click
          expect(wrapper.state().bookingDetailsVisible).toBe(true);
          onFocusHandler(); // click once more
          expect(wrapper.state().bookingDetailsVisible).toBe(true);
        });

        it('closes visible booking details on blur', () => {
          expect.assertions(2);
          onFocusHandler(); // open booking details
          expect(wrapper.state().bookingDetailsVisible).toBe(true);
          onBlurHandler(); // close booking details
          expect(wrapper.state().bookingDetailsVisible).toBe(false);
        });

        it('passes correct absolute position to booking details', () => {
          bookingDetailsPosHandler(bookingDetailsPosEvent);
          // mouseLeft - tripLeft => see event object
          const expectedBookingDetailsPos = 100;
          expect(wrapper.state().bookingDetailsPos)
            .toEqual(expectedBookingDetailsPos);
          const tripDetails = wrapper.find('TripDetails');
          expect(tripDetails.prop('bookingDetailsPos'))
            .toBe(expectedBookingDetailsPos);
        });
      });
    });

    it('renders the TripDetails elements', () => {
      const tripDetails = wrapper.find('TripDetails');
      expect(tripDetails).toHaveLength(1);
    });
  });
});
