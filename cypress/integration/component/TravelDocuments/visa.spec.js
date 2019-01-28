const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('user can add visas', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/travel_readiness');
    cy.route('POST', `${baseAPI}/travelreadiness`).as('createVisa');
    cy.get('#visaButton').click();
  });

  const createTestVisa = (expiryDate) => {
    cy
      .get('#actionButton').click()
      .get('input[name="country"]').type('Uganda')
      .get('[name=entryType] ').click()
      .get('div[name=entryType] > ul > li#choice:first').click()
      .get('[name=visaType]').click()
      .get('div[name=visaType] > ul > li#choice:first').click()
      .get('input[name="dateOfIssue"]').type('12/12/2018')
      .get('input[name="expiryDate"]').type(expiryDate)
      .get('.document-input__input-container').click()
      .uploadFile('../fixtures/images/guesthouse.jpg','image/jpeg')
      .get('#submit').click().wait(9000)
      .get('.modal-close').click({multiple: true});
  };

  const deleteTestVisa = () => {
    cy
      .get('#toggleIcon2').click()
      .get('#deleteRequest').click()
      .get('.bg-btn.bg-btn--active.delete-document-button').contains('Delete').click();
  };

  beforeEach(() => {
    cy.authenticateUser();
  });

  it('find Add visa button', () => {
    cy
      .get('#actionButton')
      .contains('Add visa');
  });

  it('adds a visa', () => {
    createTestVisa('12/12/2019');
    deleteTestVisa();
  });

  it('see modal displaying details of the visa and comment', () => {
    createTestVisa('12/12/2020');
    cy
      .get('.document-name').first().click()
      .get('.ql-editor').type('this is a demo comment')
      .get('#post-submit').click()
      .wait(3000)
      .get('.modal-close').click();
    deleteTestVisa();
  });

  it('should edit unverified visa', () => {
    createTestVisa('12/12/2021');
    cy
      .get('#toggleIcon2').click()
      .get('#iconBtn2').click()
      .get('input[name="dateOfIssue"]').clear().type('12/12/2010')
      .get('input[name="country"]').clear().type('Nigeria')
      .get('#submit').click().wait(9000);
    deleteTestVisa();
  });

  it('should delete unverified visa', () => {
    createTestVisa('12/12/2019');
    deleteTestVisa();
  });
});
