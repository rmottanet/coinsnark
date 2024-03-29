class DataFetcher {
    async fetchCurrencies() {
		
        try {
			
            const codeUrl = 'https://coinsnark-rb4mt54l.b4a.run/api/currency';
            const response = await fetch(codeUrl);

            if (!response.ok) {
                throw new Error(`Error when requesting the API: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

	
    async fetchResult(fromCurrency, toCurrency, amount) {
        try {
            const apiUrl = `https://coinsnark-rb4mt54l.b4a.run/api/convert?from=${fromCurrency.toUpperCase()}&to=${toCurrency.toUpperCase()}&amount=${amount}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Error when requesting the API: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error when requesting the API:', error);
            throw error;
        }
    }
}

const dataFetcherInstance = new DataFetcher();
window.dataFetcher = dataFetcherInstance;
