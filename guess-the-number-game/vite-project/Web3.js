const Web3 = require('web3');

// Use the Alchemy URL (replace 'YOUR_ALCHEMY_API_URL' with your actual Alchemy API URL)
const alchemyUrl = 'https://eth-rinkeby.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl));

// Check if the connection is successful
web3.eth.net.isListening()
    .then(() => console.log('Successfully connected to Alchemy via Web3'))
    .catch(e => console.error('Connection failed', e));
