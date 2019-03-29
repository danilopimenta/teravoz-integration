const readline = require('readline');
const axios = require('axios');
const chalk = require('chalk');

require('dotenv').config();

const apiURL = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const validatePhoneNumber = number => !!(number.match(/\d{9,10}/));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const callInit = (number) => {
  axios.post(`${apiURL}/call/receive`, { number })
    .then(body => {
      if (body) {
        console.info(chalk.blue('CALLING INITIALIZED...'));
      }
    })
    .catch(err => console.log(err));
};

const calling = (questionText) => {
  rl.question(questionText, (answer) => {
    if (!validatePhoneNumber(answer)) {
      return calling('Invalid Number!!, please try again: ');
    }

    callInit(answer);

    return rl.close();
  });
};

exports.calling = calling;
