describe('Requests', () => {
  before(() => {
    cy.server();
    cy.route('GET', 'http://127.0.0.1:5000/api/v1/requests',
      'fixture:requests/no-request');
  });

  describe('New User\'s request page', () => {
    before(() => {
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii1MSEptS3J4QThTbFBOUUZPVlZtIiwiZmlyc3RfbmFtZSI6IkFtYXJhY2h1a3d1IiwibGFzdF9uYW1lIjoiQWdibyIsImZpcnN0TmFtZSI6IkFtYXJhY2h1a3d1IiwibGFzdE5hbWUiOiJBZ2JvIiwiZW1haWwiOiJhbWFyYWNodWt3dS5hZ2JvQGFuZGVsYS5jb20iLCJuYW1lIjoiQW1hcmFjaHVrd3UgQWdibyIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUo4eVFYZHR2TkJJL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FHRGd3LWktZXZvMElaZ0JHYVFBZWgyY25OSUZRRUlKYncvbW8vcGhvdG8uanBnP3N6PTUwIiwicm9sZXMiOnsiVGVjaG5vbG9neSI6Ii1LWEg3aU1FNGViTUVYQUVjN0hQIiwiQW5kZWxhbiI6Ii1LaWloZlpvc2VRZXFDNmJXVGF1In19LCJpYXQiOjE1NDI5MDE3MTksImV4cCI6MTU0NTQ5MzcxOSwiYXVkIjoiYW5kZWxhLmNvbSIsImlzcyI6ImFjY291bnRzLmFuZGVsYS5jb20ifQ.Hfm3FGyu0pZRbRniRsvUZXOMVEogPE4t8R2vnOkrJfifsleYRa1NXaoZ1cTwwrkUpLCCclpCAkHCWsy2p05FVsbOiVZmHLlH88Er2xJHxinlCOhWWAHYkWgh8pPTt3csplC8hS2h4ZyVBz7ghvizNbyHiRP_XkPx_aAUHnQ7ICA';
      cy.authenticateUser(token);
      cy.visit('/requests');
    });

    it('displays the requests header', () => {
      cy
        .get('.PageHeader span.title')
        .contains('REQUESTS');
    });

    it('displays the `New request` button', () => {
      cy
        .get('button.action-btn.btn-new-request')
        .contains('New Request');
    });

    it('displays text when there are no requests', () => {
      cy
        .get('div.table__container')
        .find('div.table__requests--empty')
        .contains('You have no requests at the moment');
    });
  });

});

