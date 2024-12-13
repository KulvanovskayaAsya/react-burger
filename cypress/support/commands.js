/// <reference types="cypress" />

Cypress.Commands.add("mockRequests", () => {
  cy.fixture("ingredients").then((ingredients) => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      statusCode: 200,
      body: ingredients,
    }).as("getIngredients");
  });

  cy.fixture("login").then((login) => {
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
      statusCode: 200,
      body: login,
    }).as("postLogin");
  });
});

Cypress.Commands.add("setTokens", () => {
  cy.fixture("login").then((login) => {
    localStorage.setItem("accessToken", login.accessToken);
    localStorage.setItem("refreshToken", login.refreshToken);
  });
});
