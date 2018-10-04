const rooms = [
  {
    name: 'Ndovu',
    bedCount: 2,
    beds: [
      {
        name: 'Bed 1',
        trips: [
          {
            departureDate: '2018-03-01',
            returnDate: '2018-05-01'
          },
          {
            departureDate: '2018-05-01',
            returnDate: '2018-08-31'
          },
          {
            departureDate: '2018-09-15',
            returnDate: '2018-12-15'
          },
        ]
      },
      {
        name: 'Bed 2',
        trips: [
          {
            departureDate: '2018-08-29',
            returnDate: '2018-09-07'
          },
          {
            departureDate: '2018-09-09',
            returnDate: '2018-09-17'
          },
          {
            departureDate: '2018-09-22',
            returnDate: '2018-10-15'
          },
        ]
      },
    ]
  },
  {
    name: 'Tana',
    bedCount: 2,
    beds: [
      {
        name: 'Bed 1',
        trips: [
          {
            departureDate: '2018-09-06',
            returnDate: '2018-09-12'
          },
          {
            departureDate: '2018-09-13',
            returnDate: '2018-09-17'
          },
          {
            departureDate: '2018-09-23',
            returnDate: '2018-09-28'
          },
          {
            departureDate: '2018-09-29',
            returnDate: '2018-10-05'
          },
        ]
      },
    ]
  },
  {
    name: 'Kwetu',
    bedCount: 2,
    beds: [
      {
        name: 'Bed 1',
        trips: [
          {
            departureDate: '2018-02-13',
            returnDate: '2018-05-18'
          },
          {
            departureDate: '2018-06-23',
            returnDate: '2018-09-20'
          },
          {
            departureDate: '2018-09-30',
            returnDate: '2018-11-24'
          }
        ]
      },
      {
        name: 'Bed 2',
        trips: [
          {
            departureDate: '2018-02-06',
            returnDate: '2018-03-19'
          },
          {
            departureDate: '2018-08-26',
            returnDate: '2018-09-10'
          },
          {
            departureDate: '2018-09-11',
            returnDate: '2018-09-19'
          },
          {
            departureDate: '2018-09-22',
            returnDate: '2018-10-15'
          },
        ]
      },
      {
        name: 'Bed 3',
        trips: [
          {
            departureDate: '2018-04-26',
            returnDate: '2018-05-30'
          },
          {
            departureDate: '2018-08-11',
            returnDate: '2018-09-30'
          },
          {
            departureDate: '2018-11-27',
            returnDate: '2018-12-15'
          },
        ]
      }
    ]
  }
];

export default rooms;
