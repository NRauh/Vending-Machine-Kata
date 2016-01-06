module.exports = {
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
			return 0.25;
		} else if (mmDiameter === 17.91 && gWeight === 2.268) {
			return 0.10;
		} else if (mmDiameter === 21.21 && gWeight === 5.0) {
			return 0.50;
		} else {
			// need to add function for coin return
			return 0.0;
		}
	}
}
