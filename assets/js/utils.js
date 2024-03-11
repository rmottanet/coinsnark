var Validator = {

	isValidAmount: function(amount) {
		
	    try {

	        amount = amount.trim().replace(/,/g, '.');
	
	        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
	            return false;
	        }
	
	        amount = parseFloat(amount).toFixed(6);
	
	        amount = parseFloat(amount).toFixed(2);
	
	        if (parseFloat(amount) !== parseFloat(amount.trim().replace(/,/g, '.'))) {
	            return false;
	        }
	
	        if (parseFloat(amount) < 0) {
	            return false;
	        }
	
	        return true;
	    } catch (error) {
	        return false;
	    }
	},

	isValidCurrency: function(currency) {
		
	    try {

	        currency = currency.trim().toUpperCase();
	
	        if (currency.length !== 3) {
	            return false;
	        }
	
	        return true;
	    } catch (error) {
	        return false;
	    }
	}

};


var Display = {
    showConversionResult: function(amount, fromCurrency, toCurrency, response) {

        var cacheUpdated = new Date(response.conversion.cache_updated);
        var convertedAmount = response.conversion.converted;

        var formattedDate = cacheUpdated.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        var resultHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}<br><span class="date">Exchange Rate Date: ${formattedDate}</span>`;

        document.getElementById('result').innerHTML = resultHTML;
    }
};
