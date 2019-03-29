const Restify = require('restify');
const Bunyan = require('bunyan');

const { webhookHandler } = require('./handler');
require('dotenv').config();

const Logger = Bunyan.createLogger({
  name: 'webhook',
  level: 'info',
});

const Server = Restify.createServer({
  name: 'webhook',
  version: process.env.SERVER_VERSION,
  log: Logger,
});

Server.use(Restify.plugins.bodyParser());

Server.post('/webhook', webhookHandler);

Server.listen(3000, () => {
  Logger.info('%s listening at %s', Server.name, Server.url);
});
