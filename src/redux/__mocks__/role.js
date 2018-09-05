const roles = {
  role: [
    {
      id: '1',
      roleName: 'Super Administrator',
      Description: 'Can perform all task on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '2',
      roleName: 'Travel Administrator',
      Description: 'Can view and approve all request on travela',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '3',
      roleName: 'Travel Team Member',
      Description: 'Can view all request made on travela ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '4',
      roleName: 'Requester',
      Description: 'Can make travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    },
    {
      id: '5',
      roleName: 'Manager',
      Description: 'Can request and approve travel request ',
      users: [
        {
          email: 'super.boy@andela.com'
        }
      ]
    }
  ]
};

export default roles;
