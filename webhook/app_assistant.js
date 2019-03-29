const chalk = require('chalk');
const axios = require('axios');
const { mockedCustomers } = require('../mock-api/load_file');

class AppAssistant {
  constructor() {
    this.apiURL = `http://${process.env.API_HOST}:${process.env.API_PORT}`;
  }

  delegate(payload, destination) {
    const delegateData = {
      type: 'delegate',
      call_id: payload.call_id,
      destination,
    };

    axios.post(`${this.apiURL}/delegate/actions`, delegateData)
      .then(body => () => {
        if (body) {
          console.log(chalk.green('Webhook Handler: Delegated Call'));
        }
      })
      .catch(err => console.log(err));
  }

  callStandbyListener(payload) {
    let destination = 901;

    if (mockedCustomers().find(customer => customer.number === payload.their_number)) {
      destination = 900;
    }
    this.delegate(payload, destination);
  }
}

exports.AppAssistant = AppAssistant;
