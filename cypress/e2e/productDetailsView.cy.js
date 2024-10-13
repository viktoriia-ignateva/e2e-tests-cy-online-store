import { WhatsNewPage } from '../support/pages/WhatsNewPage'
import { ProductDetailsPage } from '../support/pages/ProductDetailsPage'

describe('Product Details view', () => {
    context('when clicking on product from the What is New page', () => {
        before(() => {
            cy.visit(WhatsNewPage.url)
            cy.get(WhatsNewPage.productList).should('be.visible')
        })

        it('redirects to the specific Product Details Page', () => {
            cy.get(WhatsNewPage.productLink)
                .first()
                .invoke('attr', 'title')
                .as('itemTitle');

            cy.get('@itemTitle').then((title) => {
                cy.get(WhatsNewPage.productLink)
                    .first()
                    .click();
                cy.get(ProductDetailsPage.productTitle).should('contain', title);
            });
        })
    })
})