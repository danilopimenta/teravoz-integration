const chalk = require('chalk');
const { AppAssistant } = require('./app_assistant');

exports.webhookHandler = (req, res, next) => {
  res.send({ status: 'ok' });

  console.info(chalk.green(`Webhook Handler: ${req.body.type} Event`));

  if (req.body.type === 'call.standby') {
    (new AppAssistant()).callStandbyListener(req.body);
  }
  return next();
};
