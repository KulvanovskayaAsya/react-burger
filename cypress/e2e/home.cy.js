import { selectors } from '../support/selectors';

describe("Home page", () => {
  beforeEach(() => {
    cy.mockRequests();
		cy.setTokens();

    cy.visit("/");
  });

  describe("Drag and Drop functionality", () => {
    it("should drag an ingredient and drop it into the constructor", () => {
      cy.wait("@getIngredients");

      cy.get(selectors.ingredientCard).first().as("ingredient");

      cy.get("@ingredient")
        .find(selectors.ingredientName)
        .invoke("text")
        .as("ingredientName");

      cy.get(selectors.constructorContainer).as("constructor");

      cy.get("@ingredient").trigger("dragstart");
      cy.get("@constructor").trigger("drop");

      cy.get("@ingredientName").then((ingredientName) => {
        cy.get("@constructor").should("contain", ingredientName.trim());
      });
    });
  });

  it("should open modal when ingredient is clicked", () => {
    cy.wait("@getIngredients");

    cy.get(selectors.ingredientCard).first().click();
    cy.get(selectors.modal).should("be.visible");
  });

  it("should close the ingredient modal when 'Esc' is pressed", () => {
    cy.wait("@getIngredients");

    cy.get(selectors.ingredientCard).first().click();
    cy.get(selectors.modal).should("be.visible");

    cy.get("body").type("{esc}");
    cy.get(selectors.modal).should("not.exist");
  });

  it("should close modal when close button is clicked", () => {
    cy.wait("@getIngredients");

    cy.get(selectors.ingredientCard).first().click();
    cy.get(selectors.modal).should("be.visible");

    cy.get(selectors.closeButton).click();
    cy.get(selectors.modal).should("not.exist");
  });

  it("should close modal when clicking outside", () => {
    cy.wait("@getIngredients");

    cy.get(selectors.ingredientCard).first().click();
    cy.get("body").click(0, 0);

    cy.get(selectors.modal).should("not.exist");
  });
});
