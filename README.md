# Cypress Test Suite

## Overview

This documentation provides a guide to setting up and executing Cypress tests, 
including generating and viewing test reports.

## Required Software and Tools

1. Node.js and npm
   Download: [Node.js](https://nodejs.org/)

2. Cypress
    - Cypress is a testing tool.
    - Installation: Installed via npm.

3. Mochawesome
    - A custom reporter for Mocha that generates reports.
    - Installation: Installed via npm.

## Setup Instructions

1. Install Node.js and npm
    - Download and install Node.js from [Node.js](https://nodejs.org/).
    - Verify installation by running the following commands in your terminal:
      `node -v`
      `npm -v`

2. Setup Cypress Project
    - Initialize a new npm project (if not already done):
      `npm init -y`

    - Install Cypress:
      `npm install cypress --save-dev`

3. Install Mochawesome
    - Install Mochawesome and its dependencies:
      `npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev`

4. Configure Cypress to Use Mochawesome
    - Create or update the Cypress configuration file (`cypress.config.js`):
      ```
      const { defineConfig } = require('cypress');
 
      module.exports = defineConfig({
        reporter: 'mochawesome',
        reporterOptions: {
          reportDir: 'cypress/reports',
          overwrite: false,
          html: true,
          json: true,
        },
        e2e: {
          setupNodeEvents(on, config) {
            // implement node event listeners here
          },
        },
      });
      ```

## Step-by-Step Guide to Execute the Tests

1. Open Cypress Test Runner
    - Open Cypress test runner for interactive testing:
      `npx cypress open`

2. Run Cypress Tests
    - Run the test suite and generate the report:
      `npx cypress run`

## Example Cypress Test Suite (`cypress/e2e/login.cy.js`)

```
// Feature:
describe('Cart Management', () => {

    // Given:
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

    // When:
    context('when remove item from the cart', () => {
    
        // Then:
        it('shows empty cart message', () => {
            cy.get(CartPage.removeItemButton).click()
            cy.get(CartPage.emptyCartMessage)
                .should('be.visible')
                .should('contain', 'You have no items in your shopping cart.')
        })
    })
})
```

## Custom Commands

The custom commands used in the tests are defined in `cypress/support/commands.js`. 
These commands encapsulate common actions to make tests more readable and maintainable.