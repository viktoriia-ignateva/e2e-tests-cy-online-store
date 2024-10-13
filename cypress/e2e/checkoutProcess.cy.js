import { CartPage } from '../support/pages/CartPage'
import { ProductDetailsPage } from "../support/pages/ProductDetailsPage"

// Due to lack of time, I was unable to complete this test.
describe('Checkout Process', () => {
    before(() => {
        // Clear cookies and local storage to ensure the cart is empty
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.login('john.doe@example4.com', 'Password123!')

        cy.addItemToCart(
            'https://magento.softwaretestingboard.com/radiant-tee.html',
            ProductDetailsPage.sizeOption,
            ProductDetailsPage.colorOption,
            ProductDetailsPage.addToCartButton,
            ProductDetailsPage.successMessage,
        )
        cy.visit(CartPage.url)
    })

    context('with new shipping address', () => {
        context('when proceed to checkout', () => {
            it('redirects to the Shipping detail page', () => {
                cy.wait(2000)
                cy.get('button[data-role="proceed-to-checkout"]').click({force: true})
                cy.url({ timeout: 20000 }).should('include', 'shipping')
            })

            it('allows to fill in shipping details', () => {
                cy.get('input[name="firstname"]').type('John')
                cy.get('input[name="lastname"]').type('Doe')
                cy.get('input[name="street[0]"]').type('123 Elm St')
                cy.get('input[name="city"]').type('Anytown')
                cy.get('select[name="region_id"]').select('Alabama')
                cy.get('input[name="postcode"]').type('12345')
                cy.get('input[name="telephone"]').type('1234567890')
                cy.get('input[name="ko_unique_1"]').check()
                cy.get('#shipping-method-buttons-container button', { timeout: 20000 }).click()
            })
        })

        context('when proceed to payment', () => {
            it('redirects to the Payment detail page', () => {
                cy.url({ timeout: 20000 }).should('include', 'payment')
                cy.get('#billing-address-same-as-shipping-checkmo', { timeout: 20000 }).should('be.visible').check()
            })
        })

        context('when place an order', () => {
            it('shows success message', () => {
                cy.get('button[title="Place Order"]').click()
                cy.get('[data-ui-id="page-title-wrapper"]').should('contain', 'Thank you')
            })
        })
    })
})