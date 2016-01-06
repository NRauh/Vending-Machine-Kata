var expect = require("chai").expect;
var vendingMachine = require("../vendingmachine");

describe("insertedAmount", function() {
	it("tells the customer to insert a coin if the inserted amount is zero", function() {
		var value = vendingMachine.insertedAmount();
		expect(value).to.equal("INSERT COIN");
	});

	it("tells the value of insertedCoinAmount variable", function() {
		vendingMachine.insertedCoinAmount = 0.25;
		var value = vendingMachine.insertedAmount();
		expect(value).to.equal(0.25);
	});
});

