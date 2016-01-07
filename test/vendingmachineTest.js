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
		expect(penny).to.equal("REJECTED COIN");
		var weirdCoin = vendingMachine.addCoin(15.67, 4.2);
		expect(weirdCoin).to.equal("REJECTED COIN");
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
	it("checks to make sure amount of inserted coins covers cost", function() {
		var product = vendingMachine.selectProduct(0);
		expect(product).to.equal("PRICE $1.00");

		product = vendingMachine.selectProduct(1);
		expect(product).to.equal("PRICE $0.50");

		product = vendingMachine.selectProduct(2);
		expect(product).to.equal("PRICE $0.65");
	});

	it("lets customers buy cola", function() {
		vendingMachine.insertedCoinAmount =  100;
		var product = vendingMachine.selectProduct(0);
		expect(product).to.equal("cola");
	});

	it("lets customers buy chips", function() {
		vendingMachine.insertedCoinAmount = 50;
		var product = vendingMachine.selectProduct(1);
		expect(product).to.equal("chips");
	});

	it("lets customers buy candy", function() {
		vendingMachine.insertedCoinAmount = 65;
		var product = vendingMachine.selectProduct(2);
		expect(product).to.equal("candy");
	});

	it("subtracts the cost from coin amount as change, then resets coin amount", function() {
		vendingMachine.insertedCoinAmount = 100;
		var product = vendingMachine.selectProduct(1);
		expect(vendingMachine.insertedCoinAmount).to.equal(0);
		expect(vendingMachine.changeDue).to.equal(50);
	});

	it("says if the product is sold out", function() {
		vendingMachine.insertedCoinAmount = 100;
		vendingMachine.products[0].quantity = 0;
		var product = vendingMachine.selectProduct(0);
		expect(product).to.equal("SOLD OUT");
		vendingMachine.products[0].quantity = 10;
	});

	it("subtracts from the quantity", function() {
		vendingMachine.addCoin(24.26, 5.67);
		vendingMachine.addCoin(24.26, 5.67);
		vendingMachine.addCoin(24.26, 5.67);
		vendingMachine.addCoin(24.26, 5.67);
		vendingMachine.selectProduct(0);
		expect(vendingMachine.products[0].quantity).to.equal(9);
	});
});

describe("makeChange", function() {
	beforeEach(function() {
		vendingMachine.coinsToReturn = [];
	});

	it("returns true when there's not change left to be made", function() {
		var change = vendingMachine.makeChange();
		expect(change).to.equal(true);
	});

	it("sets coinsToReturn to an array of coins that equal the change", function() {
		vendingMachine.changeDue = 25;
		vendingMachine.makeChange();
		expect(vendingMachine.coinsToReturn).to.deep.equal([25]);

		vendingMachine.coinsToReturn = [];
		vendingMachine.changeDue = 35;
		vendingMachine.makeChange();
		expect(vendingMachine.coinsToReturn).to.deep.equal([25, 10]);

		vendingMachine.coinsToReturn = [];
		vendingMachine.changeDue = 40;
		vendingMachine.makeChange();
		expect(vendingMachine.coinsToReturn).to.deep.equal([25, 10, 5]);
	});

	it("subtracts the added coin to return from change due", function() {
		vendingMachine.changeDue = 25;
		vendingMachine.makeChange();
		expect(vendingMachine.changeDue).to.equal(0);

		vendingMachine.changeDue = 10;
		vendingMachine.makeChange();
		expect(vendingMachine.changeDue).to.equal(0);

		vendingMachine.changeDue = 5;
		vendingMachine.makeChange();
		expect(vendingMachine.changeDue).to.equal(0);
	});
});

describe("coinReturn", function() {
	beforeEach(function() {
		vendingMachine.coinsToReturn = [];
	});

	it("returns the dollar format of individual coinsToReturn", function() {
		vendingMachine.changeDue = 35;
		vendingMachine.makeChange();
		var coins = vendingMachine.coinReturn();
		expect(coins).to.equal("CHANGE: $0.25, $0.10");

		vendingMachine.coinsToReturn = [];
		vendingMachine.changeDue = 65;
		vendingMachine.makeChange();
		coins = vendingMachine.coinReturn();
		expect(coins).to.equal("CHANGE: $0.25, $0.25, $0.10, $0.05");
	});

	it("returns rejected coins", function() {
		var coin = vendingMachine.coinReturn(true);
		expect(coin).to.equal("REJECTED COIN");
	});
});
