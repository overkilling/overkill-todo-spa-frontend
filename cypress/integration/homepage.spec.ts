describe('Homepage', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '/todos',
      response: [
        { todo: 'First item' },
        { todo: 'Second item' },
        { todo: 'Third item' }
      ]
    })
  })

  it('shows the app title', () => {
    cy.visit('/')

    cy.contains('Todo App')
  })

  it('shows the user todos', () => {
    cy.visit('/')

    cy.contains('First item')
    cy.contains('Second item')
    cy.contains('Third item')
  })
})
