describe('Logout User', () => {

  it('should set token in cookie', () => {
    cy.setCookie(
      'jwt-token',
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii1MSEpsR2haOUhpTmxkVnQtakItIiwiZmlyc3RfbmFtZSI6IlRhaXdvIiwibGFzdF9uYW1lIjoiU3VuZGF5IiwiZmlyc3ROYW1lIjoiVGFpd28iLCJsYXN0TmFtZSI6IlN1bmRheSIsImVtYWlsIjoidGFpd28uc3VuZGF5QGFuZGVsYS5jb20iLCJuYW1lIjoiVGFpd28gU3VuZGF5IiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbVFaMDc3ODdiYTgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQWMvcUM2LUEyY1dBRUEvcGhvdG8uanBnP3N6PTUwIiwicm9sZXMiOnsiVGVjaG5vbG9neSI6Ii1LWEg3aU1FNGViTUVYQUVjN0hQIiwiQW5kZWxhbiI6Ii1LaWloZlpvc2VRZXFDNmJXVGF1In19LCJpYXQiOjE1NDI0ODA2NzEsImV4cCI6MTU0NTA3MjY3MSwiYXVkIjoiYW5kZWxhLmNvbSIsImlzcyI6ImFjY291bnRzLmFuZGVsYS5jb20ifQ.s4VHIRIGAZ3ZegVDXvIs6s0uCU_1bQo6LNlpGBoztuFK1cLBJrfOc1qfVAKc0d2dC9DDS5LrT-on3_9h37oqRowOdUVesOq2ipaHmlfX4jM4jAlaJaQKKRLX5W4UNOrq769CjgZkheYICx9afFowb14A3iQIhtWwbbWTW4YZeLA'
    );
    cy.visit('/requests');
  });


  it('should have a Navbar', () => {
    cy.get('header')
      .should('be.visible');
  });

  it('should click the Logout button', () => {
    cy.get('#demo-menu-lower-right')
      .click();
    cy.get('#logout').click();
  });

  it('should check the Url', () => {
    cy.url().should('eq', 'http://localhost:3000/');     
    cy.get('.toast-message').should('be.visible');
  });

});

