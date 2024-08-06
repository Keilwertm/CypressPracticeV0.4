/// <reference types = "cypress" /> 

describe("Sessions page", () => {
    it("should navigate to conferance sessions page and view day filter buttons", () => {
        cy.clickViewSessions();
        cy.url().should("include", "http://localhost:1337/conference/sessions");

        // Define aliases here
        cy.dataCy("AllSessions").as("AllSessionsBtn");
        cy.dataCy("Wednesday").as("WednesdayBtn");
        cy.dataCy("Thursday").as("ThursdayBtn");
        cy.dataCy("Friday").as("FridayBtn");

        // Validate that buttons to filter by day exists.
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });

    it("Should filter sessions and only display Wednesday sessions when Wednesday button is clicked", () => {
        cy.clickViewSessions();
       cy.get("@WednesdayBtn").click();
       cy.wait("@getSessionInfo");

       // Assertions that only Wednesday displays
       cy.dataCy("day").should("have.length", 24);
       cy.dataCy("day").contains("Wednesday").should("be.visible");
       cy.dataCy("day").contains("Thursday").should("not.exist");
       cy.dataCy("day").contains("Friday").should("not.exist");
       });

        it("Should filter sessions and only display Thursday sessions when Thursday button is clicked", () => {
            cy.clickViewSessions();
            cy.get("@ThursdayBtn").click();
            cy.wait("@getSessionInfo");
        
    
            // Assertions that only Thursday displays
            cy.dataCy("day").contains("Wednesday").should("not.exist");
            cy.dataCy("day").contains("Thursday").should("be.visible");
            cy.dataCy("day").contains("Friday").should("not.exist");
            });

            it("Should filter sessions and only display Friday sessions when Friday button is clicked", () => {

                // Stubbing a response data
                cy.intercept("POST", "http://localhost:4000/graphql",{fixture: "sessions.json",}).as("getSessionInfo");
                cy.get("@FridayBtn").click();
                cy.wait("@getSessionInfo");
        
                // Assertions that only Friday displays
                cy.dataCy("day").should("have.length", 4);
                cy.dataCy("day").contains("Wednesday").should("not.exist");
                cy.dataCy("day").contains("Thursday").should("not.exist");
                cy.dataCy("day").contains("Friday").should("be.visible");
                });

                it("Should filter sessions and only display All sessions when All Sessions button is clicked", () => {
                cy.clickViewSessions();
                cy.get("@AllSessionsBtn").click();
                cy.wait("@getSessionInfo");
            
                    // Assertions that all are visible
                    cy.dataCy("day").contains("Wednesday").should("be.visible");
                    cy.dataCy("day").contains("Thursday").should("be.visible");
                    cy.dataCy("day").contains("Friday").should("be.visible");
                    });
    });