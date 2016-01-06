module.exports = {
	insertedCoinAmount: 0,
	
	insertedAmount: function() {
		if (this.insertedCoinAmount > 0) {
			return this.insertedCoinAmount;
		} else {
			return "INSERT COIN";
		}
	}
}
