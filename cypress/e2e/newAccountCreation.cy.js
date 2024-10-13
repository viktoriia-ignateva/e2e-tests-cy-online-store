import { CreateNewAccountPage } from '../support/pages/CreateNewAccountPage';

describe('CreateNewCustomerAccount', () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit(CreateNewAccountPage.url)
    })

    context('when register a new user with valid details', () => {
        before(() => {
            cy.get(CreateNewAccountPage.firstName).type('John');
            cy.get(CreateNewAccountPage.lastName).type('Doe');
            cy.get(CreateNewAccountPage.email).type('john.doe@example7.com');
            cy.get(CreateNewAccountPage.password).type('Password123!');
            cy.get(CreateNewAccountPage.passwordConfirmation).type('Password123!');
            cy.get(CreateNewAccountPage.createAccountButton).click();
        })

        it('redirects to the Account Page and shows registration success message', () => {
            cy.url().should('include', '/customer/account');
            cy.get(CreateNewAccountPage.alert)
                .should('be.visible')
                .should('contain', 'Thank you for registering with Main Website Store.');
        })
    })
})