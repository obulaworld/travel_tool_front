const testToken = Cypress.env('token');

Cypress.Commands.add('authenticateUser', (token = testToken) => {
  cy.setCookie('jwt-token', token);
});
