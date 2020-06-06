beforeEach(() => {
  cy.visit("/login");
});
// Teste 1
describe("Login Component", () => {
  describe("Render without crash", () => {
    it("Render the inputs", () => {
      cy.get("#username").should("exist");
      cy.get("#password").should("exist");
    });

    it("Render button", () => {
      cy.get("button[type=submit]").should("exist");
    });
  });

  describe("Validating the form", () => {
    it("Invalid username", () => {
      cy.get("#username").type("aa").blur().should("have.class", "bg-red-100");
      cy.get("button[type=submit]").should("be.disabled");
    });

    it("Invalid password", () => {
      cy.get("#password")
        .type("1234567")
        .blur()
        .should("have.class", "bg-red-100");
      cy.get("button[type=submit]").should("be.disabled");
    });

    it("Valid username and password", () => {
      cy.get("#username")
        .type("John Doe")
        .blur()
        .should("not.have.class", "bg-red-100");
      cy.get("#password")
        .type("12345678")
        .blur()
        .should("not.have.class", "bg-red-100");
      cy.get("button[type=submit]").should("not.be.disabled");
    });
  });
});
