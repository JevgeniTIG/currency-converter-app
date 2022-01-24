describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('app-navigation')
    cy.get('router-outlet')
    cy.contains('Currency Converter')
    cy.get('button')
    cy.contains('CONVERT')
    cy.get('button').click()
    cy.get('img')
    cy.get('img').click()
    cy.get('form')
    cy.get('mat-form-field')
    cy.contains('Amount from')
    cy.contains('Amount to')

  })
})
