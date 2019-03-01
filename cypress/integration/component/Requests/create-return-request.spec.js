const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Requests page(create return trip request)', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
  });

  describe('Request Form', () => {
    before(() => {
      // Click on 'New Request' button
      cy.get('button.action-btn.btn-new-request').as('request-button');
      cy.get('@request-button').click().wait(2000);
      cy.get('#submit').as('next');
      cy.get('@next').click().wait(2000);
    });

    it(`should render the components of
        	'New Request' form`, () => {
      cy.get('@next')
        .should('be.visible');
      cy.get('.current')
        .should('be.visible');
      cy.get('@next')
        .should('be.disabled');
    });

    it(`checks the return radio button as the default trip type
			 	when the form launches`, () => {
      cy.get('input[type=radio]#return').should('be.checked');
    });

    it(`shows validation error for empty fields after
          user focuses and leaves the field without filling it`, () => {
      cy.get('input[name=origin-0]')
        .focus()
        .blur();
      cy.get('input[name=origin-0] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it(`disables the submission button when some of
        the fields are missing`, () => {
      cy.get('button#submit').should('be.disabled');
    });
  });

  describe('Create return request', () => {
    it('creates a return request', () => {
      cy.server();
      cy.route('POST', `${baseAPI}/requests`).as(
        'createRequest'
      ); // Used to check when request is POST completed

      // Fill form data
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
      cy.get('div[name=reasons-0]')
        .click()
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('div[name=reasons-0] > ul > li#choice:first')
        .wait(2000)
        .click();
      cy.get('textarea').first().type('Travel Reason');
      cy.get('div[name=bed-0]').wait(2000).click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(2000)
        .click();
      // Submit form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      // check that the request has been made
      cy.get('div.request__tab-card').first()
        .children('div')
        .should('have.class', 'mark');

      // Okay the travel sipend
      cy.get('#stipend-next').click().wait(2000);

      // Submit request
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      cy.wait('@createRequest').then(request => {
        cy.get('.toast-message')
          .should('be.visible')
          .contains('Travel request created successfully. Please follow up with your line manager for approval');
      });

      // authenticate user again
      cy.authenticateUser();
      cy.visit('/requests').wait(3000);

      // check for created request in request table
      cy.get('.table__row')
        .eq(0)
        .find('td')
        .as('request-data');
      cy.get('@request-data')
        .eq(1)
        .should('contain', 'Return'); // trip type column
      cy.get('@request-data')
        .eq(2)
        .should('contain', 'Nairobi, Kenya'); // origin column
      cy.get('@request-data')
        .eq(3)
        .should('contain', '2 days'); // trip duration column
      cy.get('@request-data')
        .eq(5)
        .should('contain', '0% complete'); // travel completion column
      cy.get('@request-data')
        .eq(6)
        .should('contain', 'Open'); // status column
      // Delete request after creation
      cy.get('.request__status--open + .menu__container:first').click();
      cy.get('#deleteRequest').click();
      cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > .table__menu-container > .table__menu-list > #deleteRequest > .overlay > .modal > .modal-content > .delete-checklist-item__footer > .bg-btn')
        .click();

    });
  });
});
