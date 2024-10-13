import { CartPage } from '../support/pages/CartPage'
import { ProductDetailsPage } from "../support/pages/ProductDetailsPage"

describe('Cart Management', () => {
    before(() => {
        // Clear cookies and local storage to ensure the cart is empty
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.addItemToCart(
            'https://magento.softwaretestingboard.com/radiant-tee.html',
            ProductDetailsPage.sizeOption,
            ProductDetailsPage.colorOption,
            ProductDetailsPage.addToCartButton,
            ProductDetailsPage.successMessage,
        )
        cy.visit(CartPage.url)
    })

    context('when update quantity of a cart item', () => {
        it('shows updated quantity', () => {
            cy.get(CartPage.itemQuantity).clear().type('3')
            cy.get(CartPage.itemQuantity).should('have.value', '3')
        })
    })

    context('when remove item from the cart', () => {
        it('shows empty cart message', () => {
            cy.get(CartPage.removeItemButton).click()
            cy.get(CartPage.emptyCartMessage)
                .should('be.visible')
                .should('contain', 'You have no items in your shopping cart.')
        })
    })
})