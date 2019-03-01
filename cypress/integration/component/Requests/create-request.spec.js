const baseAPI = Cypress.env('REACT_APP_API_URL');
const userDataURL = /api\/v1\/user\/\W+/;

describe('Requests page(create new request)', () => {
  let data;
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as(
      'getUserData'
    );
    cy.visit('/requests').wait(3000);
    cy.wait('@getUserData').then(userData => {
      data = userData.response.body.result;
    });
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('button#submit').as('next-button');
  });

  describe('Request form after personal details have been populated', () => {
    let request;
    before(() => {
      //check that populated personal details match those from the api
      cy.get('input[name=name]').should('have.value', data.fullName);
      cy.get('input[name=department').should('have.value', data.department);
      cy.get('button.bg-btn--active').contains(data.gender);
      cy.get('input#your-role').should('have.value', data.occupation);
      cy.get('input#your-manager').should('have.value', data.manager);
      cy.get('input#user-location').should('have.value', data.location);


      // Click on 'New Request' button
      cy.get('button#submit').as('next-button');
      cy.get('@next-button').click();
    });

    it('checks that the return trip is the default selected', ()=>{
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

    it('creates one way trip request', ()=>{
      cy.server();
      cy.route('POST', `${baseAPI}/requests`).as('createRequest');
      // populate the fields
      cy.get('label').contains('One Way').click();
      cy.get('input[type=radio]#oneWay').should('be.checked');
      cy.get('input[name=origin-0]')
        .type('Nairobi')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('Kampala')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').click();
      cy.get('.react-datepicker__day--today').next().click();
      cy.get('div[name=reasons-0]').wait(3000).click();
      cy.get('div[name=reasons-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('div[name=bed-0]').wait(3000).click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('textarea').first().type('This is some text to explain the travel reason');

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      // check that the request details have all been populated
      cy.get('div.request__tab-card').first()
        .children('div')
        .should('have.class', 'mark');

      //send the request
      cy.get('button#stipend-next').click();
      cy.get('button#submit').click();
      cy.wait('@createRequest').then(createdRequest => {
        cy.get('.toast-message')
          .should('be.visible')
          .contains('Travel request created successfully. Please follow up with your line manager for approval');
      });

      //delete the request from the list of created requests
      cy.authenticateUser();
      cy.visit('/requests').wait(3000);
      cy.get('i.fa.fa-ellipsis-v').first().click();
      cy.get('li#deleteRequest').first().click();
      cy.get('button.bg-btn.bg-btn--active').contains('Delete').click({force:true});
    });
  });
});



