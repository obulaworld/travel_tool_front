const baseAPI = Cypress.env('REACT_APP_API_URL');
const userDataURL = /api\/v1\/user\/\W+/;

describe('Approval page(Approval or rejection of request by managers)', () => {
  beforeEach(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as('getUserDetails');
    cy.visit('/requests/my-approvals').wait(3000);
    cy.wait('@getUserDetails').wait(3000);
  });
  
  it('should approve a request and toast a successful approval message', () => {
    cy.get('.request__status--open:first').parent().parent().parent().parent().as('openRow');
    cy.get('@openRow').find('div.button-outline').click();
    cy.get('.action-button--approve').click();
    cy.get('#approve').click();
    cy.get('.action-button--disabled').contains('reject').should('be.disabled');
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Request approved successfully');
  });

  it('should reject a request and toast a successful rejection message', () => {
    cy.get('.request__status--open:first').parent().parent().parent().parent().as('openRow');
    cy.get('@openRow').find('div.button-outline').click();
    cy.get('.action-button--reject').click();     
    cy.get('#reject').click();
    cy.get('.action-button--disabled').contains('approve').should('be.disabled');
    cy.get('.toast-message')
      .should('be.visible')
      .contains('Request rejected successfully');
  });

  it(`should open request and show approved badge when an approved
          request is clicked`, () => {
    cy.get('.request__status--approved:first').parent().parent().parent().parent().as('approvedRow');
    cy.get('@approvedRow').find('div.button-outline').click();
    cy.get('.action-button--approved')
      .should('be.visible')
      .contains('approved');
  });

  it(`should open request and show rejected badge when a rejected
  request is clicked`, () => {
    cy.get('.request__status--rejected:first').parent().parent().parent().parent().as('rejectedRow');
    cy.get('@rejectedRow').find('div.button-outline').click();
    cy.get('.action-button--rejected')
      .should('be.visible')
      .contains('rejected');
  });
});
