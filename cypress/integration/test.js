describe("API Testing and save as json data", () => {
  var baseURL = "https://sellerfusion-qa-test.vercel.app";
  it("Write Analytics data to a json file / dump analytics data to variable", () => {
    cy.request(baseURL + "/api/analytics").as("Analytics");
    cy.get("@Analytics").then((response) => {
      var analyticsArr = new Array();
      analyticsArr = response;
      cy.log(analyticsArr);
      cy.log(analyticsArr.body.data[0].data.data["cost"]);
      // cy.writeFile("Analytics.json", analyticsArr);
    });
  });
  it("Write Products data to a json file / dump products data to variable", () => {
    cy.request(baseURL + "/api/products").as("Products");
    cy.get("@Products").then((response) => {
      var productsArr = new Array();
      productsArr = response;
      cy.log(productsArr);
      cy.log(productsArr.body.data[0]["amazon_fee"]);

      //cy.writeFile("Products.json", productsArr);
    });
  });
});
