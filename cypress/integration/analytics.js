//  <reference type="Cypress" />;

// This is sample code just to show that I can code in Cypress.

describe("These are test cases for Analytics section", () => {
  function getAnalyticsDataFromFixture() {
    var baseURL = "https://sellerfusion-qa-test.vercel.app";
    cy.request(baseURL + "/api/analytics").as("Analytics");
    cy.fixture("Analytics.json").as("analyticsData");
  }
  before("this is before each", () => {
    cy.visit("https://sellerfusion-qa-test.vercel.app");
    // var baseURL = "https://sellerfusion-qa-test.vercel.app";
    // cy.request(baseURL + "/api/analytics").as("Analytics");
    getAnalyticsDataFromFixture();
    cy.get("@Analytics").then((response) => {
      var analyticsArr = new Array();
      analyticsArr = response;
      cy.writeFile("cypress/fixtures/Analytics.json", analyticsArr);
      var config_currency_country =
        analyticsArr.body.data[0].config["currency__country"];
      cy.log(analyticsArr);
      cy.log(analyticsArr.body.data[0].data.data["cost"]);
      cy.log(analyticsArr.body.data[0].data.com_data["cost"]);
      cy.log(analyticsArr.body.data[0].config["currency__country"]);
      cy.log(config_currency_country);
    });
  });
  it("Get element from front-end", () => {
    cy.wait(10000);
    cy.xpath(
      "//*[@id='__next']/div/main/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div/div[1]/span/p[1]"
    )
      .invoke("text")
      .as("var3");
  });

  //let's create use those created aliases in another test
  //remember - NO arrow functions to create hooks when using aliases
  it("Getting value from front-end and api from dumped variable", function () {
    const variable = this.var3;
    cy.log("this is variable from web", variable);
    cy.wait(6000);
    // one way to get data from api is like repeating this code, it will
    // be code redundancy. In order to avoid this we can write a function in another file and get data from there.
    getAnalyticsDataFromFixture();
    cy.get("@Analytics").then((response) => {
      var analyticsArr = new Array();
      analyticsArr = response;
      let config_currency_country =
        analyticsArr.body.data[0].config["currency__country"];
      cy.log(analyticsArr);
      cy.log(analyticsArr.body.data[0].data.data["cost"]);
      cy.log(analyticsArr.body.data[0].data.com_data["cost"]);
      cy.log(analyticsArr.body.data[0].config["currency__country"]);
      cy.log(config_currency_country);
    });
  });
  // Another way to get the values from api is by using the the code to save api data in json file
  // and then by reading Analytics.json file which is saved at start we can get data from it
  it("Getting value from file stored in fixture", function () {
    getAnalyticsDataFromFixture();
    cy.get("@analyticsData").then((response) => {
      var analyticsD = new Array();
      analyticsD = response;
      cy.log(analyticsD.body.data[0].data.data["cost"]);
    });
  });
});
