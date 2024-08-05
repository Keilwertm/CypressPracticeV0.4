/// <reference types = "cypress" /> 

describe("Sessions page", () => {
    it("should navigate to conferance sessions page and view day filter buttons", () => {
        cy.visit("http://localhost:1337/conference");
        cy.get("h1").contains("View Sessions").click();

        cy.url().should("include", "http://localhost:1337/conference/sessions");

        // Validate that buttons to filter by day exists.
        cy.get("[data-cy=AllSessions]");
        cy.get("[data-cy=Wednesday]");
        cy.get("[data-cy=Thursday]");
        cy.get("[data-cy=Friday]");
    });
});