const date = new Date();
const departureDate = new Date(date.setDate(date.getDate() + 1))
  .toISOString().split('T')[0];
const returnDate = new Date(date.setDate(date.getDate() + 3))
  .toISOString().split('T')[0];

export const travelChecklists = [
  {
    'destination': 'Kampala, Uganda',
    'checklist':[
      {'id': '1',
        'name': 'Visa Application',
        'resources': [{
          'checklistItemId':1,
          'id':2,
          'label': 'Application guide',
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':true,
        'deleteReason':null,
      },{
        'id': 2,
        'name': 'Ticket Information',
        'resources': [{
          'checklistItemId':2,
          'id':1,
          'label': null,
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':false,
        'deleteReason':null,
      },
      {
        'id': 3,
        'name': 'Interpol Letter',
        'resources': [{
          'checklistItemId':3,
          'id':1,
          'label': null,
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':true,
        'deleteReason':null,
      }
    ]},
  {
    'destination': 'Lagos, Nigeria',
    checklist:[{'id': 8,
      'name': 'Visa Application',
      'resources': [{
        'checklistItemId':1,
        'id':2,
        'label': 'Application guide',
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':true,
      'deleteReason':null,
    },{
      'id': 9,
      'name': 'Yellow Fever',
      'resources': [{
        'checklistItemId':2,
        'id':1,
        'label': null,
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':true,
      'deleteReason':null,
    },
    {
      'id': 7,
      'name': 'Ticket Information',
      'resources': [{
        'checklistItemId':2,
        'id':1,
        'label': null,
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':false,
      'deleteReason':null,
    }
    ]}
];

export const mockRequest = {
  id: 'hg3456yh',
  name: 'Tester Demola',
  origin: 'Kampala',
  destination: 'New york',
  gender: 'Male',
  manager: 'Some manager',
  department: 'TDD',
  role: 'Senior Consultant',
  tripType: 'multi',
  picture: 'https://sgeeegege',
  trips: [
    {
      id: '123',
      origin: 'Nairobi',
      destination: 'Lagos, Nigeria',
      departureDate,
      returnDate,
    },
    {
      origin: 'New York',
      destination: 'Nairobi',
      departureDate,
      returnDate,
    },
    {
      id: '234',
      origin: 'New York',
      destination: 'Kampala, Uganda',
      departureDate,
      returnDate,
    }
  ],
};

// export default travelChecklists;
