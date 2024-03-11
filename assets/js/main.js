function updateAvailableCurrencies(currencyData) {
    // Update the available currencies based on the data obtained
    availableCurrencies = [];

    // Check if currencyData is a valid object with 'currencies' property
    if (typeof currencyData === 'object' && currencyData !== null && currencyData.hasOwnProperty('currencies')) {
        // Extract currencies from currencyData
        var currencies = currencyData.currencies;
        
        // Iterate through the currencies object
        for (var key in currencies) {
            if (currencies.hasOwnProperty(key)) {
                // Create currency string with key and value, then push to availableCurrencies array
                var currencyString = key + ' - ' + currencies[key];
                availableCurrencies.push(currencyString);
            }
        }
        
    } else {
        // Log an error message if currency data is not valid
        console.error('The currency data is not valid.');
    }
}


function initializeAutocomplete() {
    // Initialize Autocomplete feature for currency input fields
    $("#fromCurrencyInput, #toCurrencyInput").autocomplete({
        source: availableCurrencies,
        select: function(event, ui) {
            // Set the selected value in the input field
            $(this).val(ui.item.value);
            // Get the corresponding input field ID and update its value
            var targetId = $(this).attr('id').replace('Input', '');
            $("#" + targetId).val(ui.item.value.split(' ')[0]);
            return false;
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    try {
        // Fetch currency data when the DOM content is loaded
        dataFetcherInstance.fetchCurrencies()
            .then(function(currency) {
                // Update available currencies and initialize autocomplete
                updateAvailableCurrencies(currency);
                initializeAutocomplete();
            })
            .catch(function(error) {
                // Log an error if fetching currency data fails
                console.error(error);
            });
    } catch (error) {
        // Log any unexpected errors during initialization
        console.error(error);
    }
});


$(document).ready(function() {
    var availableCurrencies = [];

    function convertCurrency() {
        var amount = $('#amount').val();
        var fromCurrency = $('#fromCurrency').val();
        var toCurrency = $('#toCurrency').val();

	    fromCurrency = fromCurrency.split('-')[0].trim();
	    toCurrency = toCurrency.split('-')[0].trim();
    
		if (!Validator.isValidAmount(amount)) {
			$('#result').text('Please enter a positive numerical value to two decimal places.');
			return;
		}
		
		if (!Validator.isValidCurrency(fromCurrency)) {
			$('#result').text('Please enter a valid acronym.');
			return;
		}
	
	    if (!Validator.isValidCurrency(toCurrency)) {
	        $('#result').text('Please enter a valid acronym for the "To" currency.');
	        return;
	    }

        dataFetcherInstance.fetchResult(fromCurrency, toCurrency, amount)
            .then(function(response) {
                // Display conversion result and reset input fields
                Display.showConversionResult(amount, fromCurrency, toCurrency, response);
                $('#amount').val('');
                $('#fromCurrencyInput, #toCurrencyInput').autocomplete("destroy").val('');
                initializeAutocomplete();
            })
            .catch(function(error) {
                // Log an error if currency conversion fails
                console.error('Currency conversion error:', error);
                $('#result').text('Failed to convert currency. Please try again later.');
            });
    }

    function presetCurrency(fromCurrency, toCurrency) {
        var amount = $('#amount').val();
        
        if (!Validator.isValidAmount(amount)) {
            $('#result').text('Please enter a positive numerical value to two decimal places.');
            return;
        }

        dataFetcherInstance.fetchResult(fromCurrency, toCurrency, amount)
            .then(function(response) {
                // Display conversion result and reset input fields
                Display.showConversionResult(amount, fromCurrency, toCurrency, response);
                $('#amount').val('');
                $('#fromCurrencyInput, #toCurrencyInput').autocomplete("destroy").val('');
                initializeAutocomplete();
            })
            .catch(function(error) {
                // Log an error if currency conversion fails
                console.error('Currency conversion error:', error);
                $('#result').text('Failed to convert currency. Please try again later.');
            });
    }
    
    // Event listener for currency conversion button
    $('#convertButton').click(function() {
        convertCurrency();
    });

    // Event listeners for preset currency buttons
    $('#usdToBrl').click(function() {
        presetCurrency('USD', 'BRL');
    });

    $('#eurToBrl').click(function() {
        presetCurrency('EUR', 'BRL');
    });
});
