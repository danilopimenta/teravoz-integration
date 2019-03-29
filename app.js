const { calling } = require('./call/calling');

// Start Api mocked server
require('./mock-api/api');

// Start webhook server
require('./webhook/server');

setTimeout(() => {
  calling('Welcome to assistant.\n please, provide us your phone number:  ');
}, 2000);
