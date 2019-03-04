const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Should create multiple trips', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.get('button.action-btn.btn-new-request')
      .click();
  });

  it(`should be displayed in a view with user information
        	'New Request' button is clicked`, () => {
    cy.get('.new-request_title')
      .should('be.visible')
      .contains('CREATE A NEW TRAVEL REQUEST');
    cy.get('.new-request')
      .find('button#submit')
      .click();
    cy.get(':nth-child(3) > li > label')
      .click();
    cy.get('.trip__tab-body')
      .contains('Trip 2');
    cy.get('input[name=origin-0]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .type('Lagos')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=departureDate-0]').click();
    cy.get('.react-datepicker__day--today').click();
    cy.get('input[name=arrivalDate-0]').click();
    cy.get('.react-datepicker__day--today + div:first').wait(2000).click();
    cy.get('div[name=reasons-0]').wait(3000).click();
    cy.get('div[name=reasons-0] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('div[name=bed-0]').wait(2000).click();
    cy.get('div[name=bed-0] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('textarea').first().type('Boot Camp');
    cy.get('input[name=origin-1]')
      .should('have.value', 'Lagos, Nigeria');
    cy.get('input[name=destination-1]')
      .type('Kampala')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=arrivalDate-0]').invoke('val').then((val) => {
      const nextDepartureDate0 = val;
      cy.get('input[name=departureDate-1]').invoke('val').then((val) => {
        const departureDate1 = val;
        expect(departureDate1).to.eq(nextDepartureDate0);
      });
    });
    cy.get('div[name=reasons-1]').wait(3000).click();
    cy.get('div[name=reasons-1] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip1 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Boot Camp');
  });

  it('Add third trip', () => {
    cy.get('button.another-trip').click();
    cy.get('input[name=destination-2]')
      .type('Kigali')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=arrivalDate-1]')
      .should('be.visible')
      .click();
    cy.get('.react-datepicker__navigation')
      .click();
    cy.get(':nth-child(3) > .react-datepicker__day--tue')
      .wait(2000).click();
    cy.get('div[name=bed-1]').wait(2000).click();
    cy.get('div[name=bed-1] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('input[name=arrivalDate-1]').invoke('val').then((val) => {
      const nextDepartureDate1 = val;
      cy.get('input[name=departureDate-2]').invoke('val').then((val) => {
        const departureDate2 = val;
        expect(departureDate2).to.eq(nextDepartureDate1);
      });
    });
    cy.get('div[name=reasons-2]').wait(3000).click();
    cy.get('div[name=reasons-2] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip2 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Partner Engagement');
  });

  it('Add fourth trip', () => {
    cy.get('button.another-trip').click();
    cy.get('input[name=destination-3]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=arrivalDate-2]')
      .should('be.visible')
      .click();
    cy.get('.react-datepicker__navigation')
      .click();
    cy.get(':nth-child(4) > .react-datepicker__day--mon')
      .wait(2000).click();
    cy.get('div[name=bed-2]').wait(2000).click();
    cy.get('div[name=bed-2] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('input[name=arrivalDate-2]').invoke('val').then((val) => {
      const nextDepartureDate2 = val;
      cy.get('input[name=departureDate-3]').invoke('val').then((val) => {
        const departureDate3 = val;
        expect(departureDate3).to.eq(nextDepartureDate2);
      });
    });
   
    cy.get('div[name=reasons-3]').wait(3000).click();
    cy.get('div[name=reasons-3] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('div[name=bed-3]').wait(2000).click();
    cy.get('div[name=bed-3] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip3 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Partner Engagement');
  });

  it('Delete second last trip', () => {
    cy.get('.trip__tab-body')
      .find('#trip3')
      .should('be.visible'); 
    cy.get('#trip2 > .delete-icon > .addsvg')
      .click()
      .wait(4000);
    cy.get('.trip__tab-body')
      .find('#trip3')
      .should('not.be.visible');
  });

  it('Submit created trip', () => {
    cy.get('button#submit')
      .click();
    cy.get('#stipend-next')
      .click();
    cy.get('#submit')
      .click();
    cy.authenticateUser();
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Travel request created successfully. Please follow up with your line manager for approval');
    cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > #toggleIcon')
      .click();
    cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > .table__menu-container > .table__menu-list > #deleteRequest')
      .click();
    cy.get('.delete-checklist-item__footer > .bg-btn').click();
  });
});
