var expect = require("chai").expect;
var vendingMachine = require("../vendingmachine");

beforeEach(function() {
	vendingMachine.insertedCoinAmount = 0;
});

describe("insertedAmount", function() {
	it("tells the customer to insert a coin if the inserted amount is zero", function() {
		var value = vendingMachine.insertedAmount();
		expect(value).to.equal("INSERT COIN");
	});

	it("tells the value of insertedCoinAmount variable", function() {
		vendingMachine.insertedCoinAmount = 25;
		var value = vendingMachine.insertedAmount();
		expect(value).to.equal(25);
	});
});

describe("addCoin", function() {
	it("can add quarters", function() {
		var quarter = vendingMachine.addCoin(24.26, 5.67);
		expect(quarter).to.equal(25);
	});

	it("can add dimes", function() {
		var dime = vendingMachine.addCoin(17.91, 2.268);
		expect(dime).to.equal(10);
	});

	it("can add nickels", function() {
		var nickel = vendingMachine.addCoin(21.21, 5.0);
		expect(nickel).to.equal(5);
	});

	it("rejects other coins", function() {
		var penny = vendingMachine.addCoin(19.05, 2.5);
		expect(penny).to.equal(0);
		var weirdCoin = vendingMachine.addCoin(15.67, 4.2);
		expect(weirdCoin).to.equal(0);
	});

	it("adds the values together", function() {
		vendingMachine.addCoin(24.26, 5.67);
		expect(vendingMachine.insertedAmount()).to.equal(25);

		vendingMachine.addCoin(17.91, 2.268);
		expect(vendingMachine.insertedAmount()).to.equal(35);

		vendingMachine.addCoin(21.21, 5.0);
		expect(vendingMachine.insertedAmount()).to.equal(40);

		vendingMachine.addCoin(19.05, 2.5);
		expect(vendingMachine.insertedAmount()).to.equal(40);
	});
});

describe("selectProduct", function() {
	it("lets customers buy cola", function() {
		var product = vendingMachine.selectProduct(0);
		expect(product).to.equal("cola");
	});

	it("lets customers buy chips", function() {
		var product = vendingMachine.selectProduct(1);
		expect(product).to.equal("chips");
	});

	it("lets customers buy candy", function() {
		var product = vendingMachine.selectProduct(2);
		expect(product).to.equal("candy");
	});
});

