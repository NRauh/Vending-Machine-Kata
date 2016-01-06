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

describe("addCoin", function() {
	it("adds a coin based on diameter and weight, returns new value", function() {
		var quarter = vendingMachine.addCoin(24.26, 5.670);
		expect(quarter).to.equal(0.25);
	});
});

