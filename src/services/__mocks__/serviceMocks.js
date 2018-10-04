export const expectedResponse = {
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Open',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11'
    }
  ],
  meta: {
    count: {
      open: 1,
      past: 2
    },
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 1
    }
  },
  message: 'Requests retrieved successfully'
};

export const userResponse = {
  user: {
    success: true,
    message: 'data',
    result: {
      id: 1,
      fullName: 'captain america',
      email: 'captain.america@andela.com',
      userId: 'JFENDVNDK',
      createdAt: '2018-09-03T17:09:05.824Z',
      updatedAt: '2018-09-03T17:09:05.824Z',
      roleId: 401938,
      roles: {
        roleName: 'Requester',
        description: 'Can make travel request'
      }
    }
  }
};

export const roleResponses = {
  success: true,
  message: 'data',
  result: [
    {
      id: 401938,
      roleName: 'Requester',
      description: 'Can make travel request',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'captain.america@andela.com'
        },
      ]
    },
    {
      id: 53019,
      roleName: 'Manager',
      description: 'Can request and approve travel request ',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'luke.cage@andela.com'
        }

      ]
    },
  ]
};

export const tripsResponse = {
  success: true,
  trips: [
    {
      id: '3',
      origin: 'New York',
      destination: 'Nairobi',
      departureDate: '2018-09-27',
      returnDate: '2018-10-04',
      checkStatus: 'Checked In',
      checkInDate: '2018-09-30T22:36:05.261Z',
      checkOutDate: null,
      lastNotifyDate: '2018-09-30T21:46:35.295Z',
      notificationCount: 1,
      createdAt: '2018-09-30T21:46:35.031Z',
      updatedAt: '2018-09-30T22:36:05.261Z',
      bedId: 1,
      requestId: 'xDh20cuGx',
      request: {
        id: 'xDh20cuGx',
        name: 'Stephen Neutron',
        tripType: 'multi',
        manager: 'Samuel Kubai',
        gender: 'Female',
        department: 'TDD',
        role: 'Software Developer',
        status: 'Approved',
        userId: '-LMZI3qQ7GE6ETe4icAL',
        createdAt: '2018-09-30T21:46:35.026Z',
        updatedAt: '2018-09-30T21:46:35.026Z'
      },
      beds: {
        id: 1,
        bedName: 'bed 1',
        createdAt: '2018-09-30T21:46:35.013Z',
        updatedAt: '2018-09-30T21:46:35.013Z',
        roomId: 'eyt233l2bC',
        rooms: {
          id: 'eyt233l2bC',
          roomName: 'big cutter',
          roomType: 'ensuited',
          bedCount: 1,
          faulty: false,
          createdAt: '2018-09-30T21:46:35.008Z',
          updatedAt: '2018-09-30T21:46:35.008Z',
          guestHouseId: '49RuqRI3E',
          guestHouses: {
            id: '49RuqRI3E',
            houseName: 'Mini flat',
            location: 'Lagos Nigeria',
            bathRooms: 1,
            imageUrl: 'https://www.lol.com',
            createdAt: '2018-09-30T21:46:35.003Z',
            updatedAt: '2018-09-30T21:46:35.003Z',
            userId: '-MUyHJmKrxA90lPNQ1FOLNm'
          }
        }
      }
    },
  ],
  message: 'Retrieved Successfully'
};

export const singleTripResponse = {
  success: true,
  trip: {
    id: '3',
    origin: 'New York',
    destination: 'Nairobi',
    departureDate: '2018-09-27',
    returnDate: '2018-10-04',
    checkStatus: 'Checked In',
    checkInDate: '2018-09-30T22:36:05.261Z',
    checkOutDate: null,
    lastNotifyDate: '2018-09-30T21:46:35.295Z',
    notificationCount: 1,
    createdAt: '2018-09-30T21:46:35.031Z',
    updatedAt: '2018-09-30T22:36:05.261Z',
    bedId: 1,
    requestId: 'xDh20cuGx',
    request: {
      id: 'xDh20cuGx',
      name: 'Stephen Neutron',
      tripType: 'multi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Approved',
      userId: '-LMZI3qQ7GE6ETe4icAL',
      createdAt: '2018-09-30T21:46:35.026Z',
      updatedAt: '2018-09-30T21:46:35.026Z'
    }
  },
  message: 'Updated Successfully'
};
