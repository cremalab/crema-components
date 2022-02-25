describe("App", () => {
  it("Contains a link to learn about React", () => {
    cy.visit("/")
    cy.findByText("Button text").should("exist")
  })
})
