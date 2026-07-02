@smoke
Feature: User Login

  @positive
  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"
    Then I should be redirected to the inventory page

  @negative
  Scenario: Login with invalid credentials
    Given I am on the login page
    When I login with "locked_out_user" and "secret_sauce"
    Then I should see an error message