import { ProductDetailsPage } from '../support/pages/ProductDetailsPage'
import { ListingPage } from '../support/pages/ListingPage'
import { CartPage } from '../support/pages/CartPage'


describe('Adding to cart', () => {
    describe('when adding item from Product Details page', () => {
        before(() => {
            // Clear cookies and local storage to ensure the cart is empty
            cy.clearCookies();
            cy.clearLocalStorage();

            cy.visit(ProductDetailsPage.url)
        })

        it('allows to choose size', () => {
            cy.selectItemOption(ProductDetailsPage.sizeOption)
        })

        it('allows to choose colour', () => {
            cy.selectItemOption(ProductDetailsPage.colorOption)
        })

        it('shows message about the item was added to the shopping cart', () => {
            cy.intercept('https://magento.softwaretestingboard.com/**').as('APIRequests')
            cy.get(ProductDetailsPage.addToCartButton).click()
            cy.wait('@APIRequests')
            cy.get(ProductDetailsPage.successMessage, { timeout: 10000 }).should('be.visible')
        })

        it('shows selected item in the shopping cart', () => {
            cy.visit(CartPage.url)
            cy.get(CartPage.itemOptions).should('contain', 'XL').should('contain', 'Blue')
        })
    })

    describe('when adding item from Listing page', () => {
        before(() => {
            // Clear cookies and local storage to ensure the cart is empty
            cy.clearCookies();
            cy.clearLocalStorage();

            cy.visit(ListingPage.url)
            cy.get(ListingPage.productList).should('be.visible')
        })

        it('allows to choose size', () => {
            cy.get(ListingPage.productLink)
                .trigger('mouseenter')
            cy.wait(200)
            cy.get(ListingPage.productLink).parent().find('#option-label-size-143-item-168').click()
        })

        it('allows to choose colour', () => {
            cy.get(ListingPage.productLink).parent().find('#option-label-color-93-item-58').click()
        })

        it('shows message about the item was added to the shopping cart', () => {
            cy.intercept('https://magento.softwaretestingboard.com/**').as('APIRequests')
            cy.get(ListingPage.productLink).parent().find(ListingPage.addToCartButton).click({ force: true })
            cy.wait('@APIRequests')
            cy.get(ListingPage.successMessage, { timeout: 10000 }).should('be.visible')
        })

        it('shows selected item in the shopping cart', () => {
            cy.visit('https://magento.softwaretestingboard.com/checkout/cart/')
            cy.get(CartPage.itemOptions).should('contain', 'M').should('contain', 'Red')
        })
    })
})