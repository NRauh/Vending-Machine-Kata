module.exports = {
	products: [{
		product: "cola",
		price: 100,
		quantity: 10
	}, {
		product: "chips",
		price: 50,
		quantity: 10
	}, {
		product: "candy",
		price: 65,
		quantity: 10
	}],

	insertedCoinAmount: 0,

	changeDue: 0,

	coinsToReturn: [],
	
	insertedAmount: function() {
		if (this.insertedCoinAmount > 0) {
			return this.insertedCoinAmount;
		} else {
			return "INSERT COIN";
		}
	},

	addCoin: function(mmDiameter, gWeight) {
		if (mmDiameter === 24.26 && gWeight === 5.670) {
			this.insertedCoinAmount += 25;
			return 25;
		} else if (mmDiameter === 17.91 && gWeight === 2.268) {
			this.insertedCoinAmount += 10;
			return 10;
		} else if (mmDiameter === 21.21 && gWeight === 5.0) {
			this.insertedCoinAmount += 5
			return 5;
		} else {
			// need to add function for coin return
			return 0;
		}
	},

	selectProduct: function(productNum) {
		var product = this.products[productNum];

		if (this.insertedCoinAmount < product.price) {
			var stringPrice = String(product.price);

			if (stringPrice.length === 1) {
				stringPrice = "00" + stringPrice;
			} else if (stringPrice.length === 2) {
				stringPrice = "0" + stringPrice;
			}

			stringPrice = "$" + stringPrice.substr(0, stringPrice.length - 2) + "." + stringPrice.slice(stringPrice.length - 2, stringPrice.length);
			return "PRICE " + stringPrice;
		}

		if (product.quantity === 0) {
			return "SOLD OUT";
		}

		this.products[productNum].quantity -= 1;
		this.changeDue = this.insertedCoinAmount - product.price;
		this.insertedCoinAmount = 0;

		return this.products[productNum].product;
	},

	makeChange: function() {
		if (this.changeDue > 0) {
			if (this.changeDue - 25 >= 0) {
				this.coinsToReturn.push(25);
				this.changeDue -= 25;
				return this.makeChange();
			}

			if (this.changeDue - 10 >= 0) {
				this.coinsToReturn.push(10);
				this.changeDue -= 10;
				return this.makeChange();
			}

			if (this.changeDue - 5 >= 0) {
				this.coinsToReturn.push(5);
				this.changeDue -= 5;
				return this.makeChange();
			}
		}
		return true;
	}
}
