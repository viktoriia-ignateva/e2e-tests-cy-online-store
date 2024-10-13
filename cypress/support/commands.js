// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (login, password) => {
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login')
    cy.get('#email').type(login)
    cy.get('#pass').type(password)
    cy.intercept('https://magento.softwaretestingboard.com/**').as('loginAPIRequests')
    cy.get('#send2').click()
    cy.wait('@loginAPIRequests')
})

Cypress.Commands.add('selectItemOption', (sizeOptionSelector) => {
    cy.get(sizeOptionSelector).click()
    cy.get(sizeOptionSelector).should('have.attr', 'aria-checked', 'true')
})

Cypress.Commands.add('addItemToCart', (productUrl, sizeSelector, colorSelector, addToCartButtonSelector, successMessageSelector) => {
    cy.visit(productUrl)
    cy.get(sizeSelector).click()
    cy.get(colorSelector).click()
    cy.get(addToCartButtonSelector).click()
    cy.get(successMessageSelector, { timeout: 10000 }).should('be.visible')
})