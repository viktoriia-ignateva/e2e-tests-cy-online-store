import {ProductDetailsPage} from "../support/pages/ProductDetailsPage";

describe('Wishlist Functionality', () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    })

    describe('when logged out', () => {
        before(() => {
            cy.visit(ProductDetailsPage.url)
        })

        after(() => {
            cy.get('a[title="Remove This Item"]').first().click()
        })

        describe('when trying to add an item to the wishlist', () => {
            before( () => {
                cy.wait(2000)
                cy.intercept('https://magento.softwaretestingboard.com/**').as('APIRequests')
                cy.get(ProductDetailsPage.addToWishlistButton).click()
                cy.wait('@APIRequests')
            })

            it('redirects to the login page', () => {
                cy.url().should('include', '/customer/account/login')
            })

            it('redirects to the login page', () => {
                cy.login('john.doe@example5.com', 'Password123!')
                cy.url().should('include', '/wishlist/')
            })
        })
    })

    describe('when logged in', () => {
        before(() => {
            cy.visit(ProductDetailsPage.url)
        })

        describe('when trying to add an item to the wishlist', () => {
            before(() => {
                cy.wait(2000)
                cy.intercept('https://magento.softwaretestingboard.com/**').as('APIRequests')
                cy.get(ProductDetailsPage.addToWishlistButton).click()
                cy.wait('@APIRequests')
            })

            it('redirects to the login page', () => {
                cy.url().should('include', '/wishlist/')
            })

            it('shows the added item to the wishlist', () => {
                cy.get('.page.messages').should('be.visible')
                cy.get('.product-item-name a')
                    .first()
                    .should('contain', 'Radiant Tee')
            })
        })
    })
})