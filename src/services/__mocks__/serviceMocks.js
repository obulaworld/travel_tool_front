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
