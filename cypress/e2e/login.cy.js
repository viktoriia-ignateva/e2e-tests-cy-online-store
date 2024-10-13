describe('Login', () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    })

    context('when login with valid credentials', () => {
        it('redirects to the Account Page', () => {
            cy.login('john.doe@example5.com', 'Password123!')
            cy.url().should('include', '/customer/account')
        })

        it('shows correct email', () => {
            cy.get('.box.box-information p')
                .should('be.visible')
                .should('contain', 'john.doe@example5.com')
        })
    })
})