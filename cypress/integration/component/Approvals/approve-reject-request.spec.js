const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Approval page(Approval or rejection of request by managers)', () => {
  beforeEach(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', `${baseAPI}/user/-LSsFyueC086niFc9rrz`).as('getUserDetails');
    cy.visit('/requests/my-approvals').wait(3000);
    cy.wait('@getUserDetails').wait(3000);
  });
  it(`should open request modal and show approved badge when an approved
          request is clicked`, () => {
    cy.get('.request__status--approved:first').parent().parent().parent().parent().as('approvedRow');
    cy.get('@approvedRow').find('div.button-outline').click();
    cy.get('.modal__button-below > .request__status--approved')
      .should('be.visible')
      .contains('Approved');
  });

  it(`should open request modal and show rejected badge when a rejected
  request is clicked`, () => {
    cy.get('.request__status--rejected:first').parent().parent().parent().parent().as('rejectedRow');
    cy.get('@rejectedRow').find('div.button-outline').click();
    cy.get('.modal__button-below > .request__status--rejected')
      .should('be.visible')
      .contains('Rejected');
  });

  it('should approve a request and toast a successful approval message', () => {
    cy.get('.request__status--open:first').parent().parent().parent().parent().as('openRow');
    cy.get('@openRow').find('div.button-outline').click();
    cy.get('#b1').click();
    cy.get('#Approve').click();
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Request approved successfully');
  });

  it('should reject a request and toast a successful rejection message', () => {
    cy.get('.request__status--open:first').parent().parent().parent().parent().as('openRow');
    cy.get('@openRow').find('div.button-outline').click();
    cy.get('#b2').click();      
    cy.get('#Reject').click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('Request rejected successfully');
  });
});
