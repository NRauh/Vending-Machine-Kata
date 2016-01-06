var expect = require("chai").expect;
var vendingMachine = require("../vendingmachine");

describe("insertedAmount", function() {
	it("tells the customer to insert a coin if the inserted amount is zero", function() {
		var value = vendingMachine.insertedAmount();
		expect(value).to.equal("INSERT COIN");
	});
});
