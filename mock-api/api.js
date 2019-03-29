const Restify = require('restify');
const Bunyan = require('bunyan');
const chalk = require('chalk');
const { callEvents } = require('./call-events');
const { events } = require('./events');

require('dotenv').config();

const Logger = Bunyan.createLogger({
  name: 'API',
  level: 'info',
});

const Server = Restify.createServer({
  name: 'API',
  log: Logger,
});

Server.use(Restify.plugins.bodyParser());

Server.post('/delegate/actions', (req, res, next) => {
  res.send({ status: 'ok' });
  res.log.info(`Call ${req.body.call_id} Delegate`);

  console.info(chalk.red('API Delegate'));

  callEvents.emit(events.WAITING, {
    type: 'call.waiting',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: req.body.number,
    their_number_type: 'mobile',
    timestamp: '2017-01-01T00:00:00Z',
  });

  return next();
});

Server.post('/call/receive', (req, res, next) => {
  res.send({ status: 'ok' });

  callEvents.emit(events.NEW, {
    type: 'call.new',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: req.body.number,
    their_number_type: 'mobile',
    timestamp: '2017-01-01T00:00:00Z',
  });

  next();
});

Server.listen(8080, () => {
  Logger.info('%s listening at %s', Server.name, Server.url);
});
