import { WhatsNewPage } from '../support/pages/WhatsNewPage'

describe('What is New Page', () => {
    before(() => {
        cy.login('john.doe@example7.com', 'Password123!')
    })

    context('when navigate to the Whats New Page', () => {
        it('redirects to the Whats New Page', () => {
            cy.get(WhatsNewPage.whatsNewLink).click();
            cy.url().should('include', '/what-is-new');
        })

        it('shows list of products available for purchase', () => {
            cy.get(WhatsNewPage.productList).should('be.visible');
        })
    })
})