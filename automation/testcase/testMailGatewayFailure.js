var fetch = require("node-fetch");
var Mail = require("../utility/mail.js");
var globals = require("../utility/globals.js");
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var include = chai.include;

const { exec } = require('child_process');

describe(__filename.split(__dirname+"/").pop(), function() {
  beforeEach(async () => {
    await exec('//route del default', (err, stdout, stderr) => {
      if (err) {
       // node couldn't execute the command
       return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  })

  afterEach(async () => {
    await exec('//route add default gw <gatewayip>', (err, stdout, stderr) => {
      if (err) {
       // node couldn't execute the command
       return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });;
  })

  it('sce#1 -- default gatway deleted', async () => {
    var to = "myname@mydomain.com";
    var cc = "mycc@mydomain.com";
    var bcc = "mybcc@mydomain.com";
    var from = "myfrom@mydomain.com";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 504;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)

    expect(response).to.be.json
    expect(response).to.have.status(status)

    assert.equal(response.status, status);
  });

  it('sce#... -- more test scenarios to add');
});

