module.exports = {
	products: [{
		product: "cola",
		price: 100
	}, {
		product: "chips",
		price: 50
	}, {
		product: "candy",
		price: 65
	}],

	insertedCoinAmount: 0,
	
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
		} else {
			return this.products[productNum].product;
		}
	}
}
