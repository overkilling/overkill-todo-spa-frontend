describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('/')

    cy.contains('Todo App')
  })
})
