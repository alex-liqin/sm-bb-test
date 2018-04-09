var fs = require('fs');
var util = require('util');

var log_file = fs.createWriteStream(__dirname + '/automation/logs' + '/log_' + new Date() + '_' + new Date().getTime() + '.log', {flags : 'w'});
var log_stdout = process.stdout;

function Logger(fmt) { //
  log_file.write(util.format(fmt) + '\n');
  log_stdout.write(util.format(fmt) + '\n');
};

module.exports = Logger;

