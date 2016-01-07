var vendingMachine = require("./vendingmachine");
var readline = require("readline");
var selection;
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function main() {
	var balance = vendingMachine.insertedAmount();
	
	if (balance !== "INSERT COIN") {
		balance = String(balance);
		balance = balance.substr(0, balance.length - 2) + "." + balance.substr(balance.length - 2, balance.length);
		balance = "BALANCE: $" + balance;
	}

	rl.question(balance + "\n", function(input) {
		inputHandle(input);
		return main();
	});
}

function inputHandle(input) {
	var coinInput;
	var productSelection;

	switch(input) {
		case "j":
			coinInput = [24.26, 5.67];
			break;
		case "k":
			coinInput = [17.91, 2.268];
			break;
		case "l":
			coinInput = [21.21, 5.0];
			break;
		case ";":
			coinInput = [19.05, 2.5];
			break;
		case "h":
			coinInput = [15.67, 4.2];
			break;
		case "f":
			productSelection = 0;
			break;
		case "d":
			productSelection = 1;
			break;
		case "s":
			productSelection = 2;
			break;
	}

	if (coinInput) {
		var coin = vendingMachine.addCoin(coinInput[0], coinInput[1]);

		if (coin === "REJECTED COIN") {
			return console.log(coin);
		}
	}

	if (productSelection !== undefined) {
		var product = vendingMachine.selectProduct(productSelection);

		if (product.substr(0, 5) === "PRICE" || product === "SOLD OUT") {
			return console.log(product);
		}

		console.log("Enjoy your " + product + "!");

		vendingMachine.makeChange();
		return console.log(vendingMachine.coinReturn());
	}
}

main();
