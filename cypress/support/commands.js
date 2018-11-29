Cypress.Commands.add('authenticateUser', (token) => {
  cy.setCookie('jwt-token', token);
});
