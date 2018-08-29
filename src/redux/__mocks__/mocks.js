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
  openRequestsCount: 0,
  pastRequestsCount: 0,
  pagination: {
    currentPage: 1,
    pageCount: 1,
    dataCount: 1,
  },
  url: '/requests?page=1'
};

export const createRequestMock = {
  requestObj: {
    name: 'Ademola Ariya',
    origin: 'Lagos',
    destination: 'New York',
    manager: 'Samuel Kubai'
  }
};
