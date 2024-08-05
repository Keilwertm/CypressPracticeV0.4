/// <reference types = "cypress" /> 


describe("Submit sessions", () => {
    // Run before each test in this describe block 
    beforeEach(() => {
        cy.visit("http://localhost:1337/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");
        cy.get("a").contains("Submit a Session!").click();
    });
        
    it("should navigate to submit sessions page", () => {
        cy.url().should("include", "/sessions/new");        
    });
    
    it("Should submit a session successfully", () => {
        // Filling the form with session information
        cy.contains("Title").type("New Session title");
        cy.contains("Description").type("This is the greatest session");
        cy.contains("Day").type("Thursday");
        cy.contains("Level").type("Advanced");

        // Submit the form
        cy.get("form").submit();

        // Validate that form was submitted successfully
        cy.get(".row").contains("Session Submitted Successfully!");
    });
 });

