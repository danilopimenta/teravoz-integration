const { readFileSync } = require('fs');

exports.mockedEvents = () => JSON.parse(readFileSync('./mock-api/data/events.json'));

exports.mockedCustomers = () => JSON.parse(readFileSync('./mock-api/data/customer.json'));
