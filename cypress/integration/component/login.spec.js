describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Load the Image on the Login page', () => {
    cy.get('img').should('have.class', 'login-page__andela-logo');
  });

  it('Check if the button exist the Login page', () => {
    cy.get('button').should(
      'have.class',
      'mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn'
    );
  });
});
