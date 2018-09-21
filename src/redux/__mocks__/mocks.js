export const fetchRequestsResponse = {
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
      arrivalDate: '2018-12-11',
    },
  ],
  meta: {
    count: {
      open: 1,
      past: 2,
    },
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 1,
    },
  },
  message: 'Requests retrieved successfully'
};

export const createRequestMock = {
  requestObj: {
    name: 'Ademola Ariya',
    origin: 'Lagos',
    destination: 'New York',
    manager: 'Samuel Kubai'
  }
};

export const fetchRoleUsersResponse = {
  id: 53019,
  roleName: 'Manager',
  description: 'Can request and approve travel request ',
  createdAt: '2018-08-16T11:11:52.181Z',
  updatedAt: '2018-08-16T11:11:52.181Z',
  users: [
    {
      email: 'test.user@andela.com',
      fullName: 'Test User'
    }
  ]
};

export const fetchRequestsCommentsResponse = {
  id: 'xGh30atGz',
  comment: 'See you next week',
  createdAt: '2018-08-16T11:11:52.181Z',
  updatedAt: '2018-08-16T11:11:52.181Z',
};

export const fetchRequestsDetailsResponse = {
  requestData: {
    id: 'xDh20cuGx',
    name: 'Test user C',
    origin: 'Lagos',
    destination: 'Nairobi',
    manager: 'Samuel Kubai',
    department: 'TDD',
    role: 'Software Developer',
    departureDate: '2018-09-12',
    arrivalDate: '2018-11-12',
    createdAt: '2018-09-04T10:38:12.141Z',
    updatedAt: '2018-09-04T10:38:12.141Z',
    trips: [],
    comments: [
      {
        id: 'xGh30atGz',
        comment: 'See you next week',
        createdAt: '2018-08-16T11:11:52.181Z',
        updatedAt: '2018-08-16T11:11:52.181Z',
      }
    ]
  }
};

export const userImage = {
  user: {
    UserInfo:{
      picture: 'http://my-image'
    },
  }
};

export const userEmail = {
  getUserData: {
    result:{
      email: 'hari2@gmail.com'
    }
  }
};
