@regression
Feature: Inventory Management

  Background:
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"

  Scenario: Add a product to the shopping cart
    Then I should see the products page header "Products"
    When I add the item "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"