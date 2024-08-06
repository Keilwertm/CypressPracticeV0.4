/// <reference types = "cypress" /> 

describe("Navigation", () => {
    it("should navigate to conferance sessions page", () => {
        cy.clickViewSessions();
        cy.url().should("include", "http://localhost:1337/conference/sessions");
    });
});