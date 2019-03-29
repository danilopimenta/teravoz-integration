const axios = require('axios');
const chalk = require('chalk');
const { EventEmitter } = require('events');
const { events } = require('./events');
const { mockedEvents } = require('./load_file');

const payloadEvents = mockedEvents();

class CallEvent extends EventEmitter {
  constructor() {
    super();
    this.webhookUrl = `http://${process.env.WEBHOOK_HOST}:${process.env.WEBHOOK_PORT}/webhook`;
  }

  fetchWebhook(payload) {
    axios.post(this.webhookUrl, payload)
      .then(() => console.info(chalk.red('API: Notifying the WebHook')))
      .catch(err => console.log(err));
  }

  nextEvent(next, payload) {
    setTimeout(() => this.emit(next, payload), 2000);
  }
}

const callEvents = new CallEvent();

callEvents.on(events.NEW, (payload) => {
  callEvents.fetchWebhook(payload);
  callEvents.nextEvent(events.STANDBY, payloadEvents[events.STANDBY]);
});

callEvents.on(events.STANDBY, (payload) => {
  callEvents.fetchWebhook(payload);
});

callEvents.on(events.WAITING, (payload) => {
  callEvents.fetchWebhook(payload);
  callEvents.nextEvent(events.ACTOR_ENTERED, payloadEvents[events.ACTOR_ENTERED]);
});

callEvents.on(events.ACTOR_ENTERED, (payload) => {
  callEvents.fetchWebhook(payload);
  callEvents.nextEvent(events.ONGOING, payloadEvents[events.ONGOING]);
});

callEvents.on(events.ONGOING, (payload) => {
  callEvents.fetchWebhook(payload);
  callEvents.nextEvent(events.ACTOR_LEFT, payloadEvents[events.ACTOR_LEFT]);
});

callEvents.on(events.ACTOR_LEFT, (payload) => {
  callEvents.fetchWebhook(payload);
  callEvents.nextEvent(events.FINISHED, payloadEvents[events.FINISHED]);
});

callEvents.on(events.FINISHED, (payload) => {
  callEvents.fetchWebhook(payload);
});

exports.callEvents = callEvents;
