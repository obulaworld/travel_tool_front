
import RequestUtils from '../RequestUtils';

const trips = [ 
  {
    bedId: 3,
    departureDate: '2019-02-19',
    destination: 'Nairobi, Kenya',
    origin: 'Lagos, Nigeria',
    returnDate: '2019-02-28'
  },
  {
    bedId: 3,
    departureDate: '2019-02-28',
    destination: 'Kampala, Uganda',
    origin: 'Nairobi, Kenya',
    returnDate: '2019-03-28'
  },
];

const nonAndelanCenterTrip = {
  bedId: 3,
  departureDate: '2019-03-29',
  destination: 'UK, London',
  origin: 'Kampala, Uganda',
};

const stipends = [
  {
    'id': 1,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Lagos, Nigeria'
    }
  },
  {
    'id': 2,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Nairobi, Kenya'
    }
  },
  {
    'id': 2,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location':'Kampala, Uganda',
    }
  }
];


describe('Request Travel Stipend', () => {

  it('should return difference between two dates in days', () => {
    const trip = trips[0];
    const days = RequestUtils.calculateDuration(trip);
    expect(days).toBe(9);
  });

  it('should return stipend with center for a single trip', () => {
    const trip = trips[0];
    const stipend = RequestUtils.calculateSingleStipend(trip, stipends);
    expect(stipend).toMatchObject(
      [
        {
          'centerExists': true, 
          'dailyRate': 100, 
          'duration': 9, 
          'location': 'Nairobi', 
          'subTotal': 900
        }
      ]
    );
  });

  it('should return center and stipend', () => {
    const stipend = RequestUtils.stipendData(stipends);
    expect(stipend).toMatchObject(
      [
        { 
          location: 'Lagos, Nigeria',
          amount: 100 
        }, 
        { 
          location: 'Nairobi, Kenya',
          amount: 100 
        },
        { 
          location: 'Kampala, Uganda',
          amount: 100 
        }
      ]
    );
  });


  it('should return stipend for all trips', () => {
    const stipend = RequestUtils.getAllTripsStipend(trips, stipends);
    const expected  = { 
      stipendSubTotals: [
        {
          centerExists: true, 
          dailyRate: 100, 
          'duration': 9, 
          'location': 'Nairobi', 
          'subTotal': 900
        }, 
        {
          'centerExists': true, 
          'dailyRate': 100, 
          'duration': 1, 
          'location': 'Kampala', 
          'subTotal': 100}
      ], 
      'totalStipend': '$ 1000'
    };
    expect(stipend).toMatchObject(expected);
  });

  it('should return 0 stipend for trips to Non-Andelan centers', () => {
    const updatedTrip = [
      ...trips, 
      nonAndelanCenterTrip,
    ];
    const stipend = RequestUtils.getAllTripsStipend(updatedTrip, stipends);
    const expected  = { 
      stipendSubTotals: [
        {
          'centerExists': true, 
          'dailyRate': 100, 
          'duration': 9, 
          'location': 'Nairobi', 
          'subTotal': 900
        }, 
        {
          'centerExists': true, 
          'dailyRate': 100, 
          'duration': 28, 
          'location': 'Kampala', 
          'subTotal': 2800
        },
        {
          'centerExists': false, 
          'dailyRate': 'N/A', 
          'duration': 1, 
          'location': 'UK', 
          'subTotal': 0
        }
      ], 
      'totalStipend': '$ 3700'
    };
    expect(stipend).toMatchObject(expected);
  });
});
