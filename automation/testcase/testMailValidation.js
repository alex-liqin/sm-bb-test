var fetch = require("node-fetch");
var Mail = require("../utility/mail.js");
var globals = require("../utility/globals.js");
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var include = chai.include;

describe(__filename.split(__dirname+"/").pop(), function() {
  it('sce#1 -- valid email address (to, cc, bcc, from)', async () => {
    var to = "myname@mydomain.com";
    var cc = "mycc@mydomain.com";
    var bcc = "mybcc@mydomain.com";
    var from = "myfrom@mydomain.com";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 200;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)

    expect(response).to.be.json
    expect(response).to.have.status(status)
    console.log(response)
    expect(response.header).to.include({"application/json"})

    assert.equal(response.status, status);
  });

  it('sce#2 -- invalid email address (to)', async () => {
    var to = "abcd";
    var cc = "mycc@mydomain.com";
    var bcc = "mybcc@mydomain.com";
    var from = "myfrom@mydomain.com";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 400;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)
    assert.equal(response.status, status);
  });

  it('sce#3 -- invalid email address (from)', async () => {
    var to = "myname@mydomain.com";
    var cc = "c@d.com";
    var bcc = "mybcc@mydomain.com";
    var from = "";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 400;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)
    assert.equal(response.status, status);
  });

  it('sce#4 -- acceptable email address (from == to)', async () => {
    var to = "myname@mydomain.com";
    var cc = "c@d.com";
    var bcc = "mybcc@mydomain.com";
    var from = "myname@mydomain.com";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 200;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)
    assert.equal(response.status, status);
  });

  it('sce#5 -- invalid email address (to == cc)', async () => {
    var to = "myname@mydomain.com";
    var cc = "myname@mydomain.com";
    var bcc = "mybcc@mydomain.com";
    var from = "";
    var subject = "my test mail subject";
    var text = "this is a test email.";
    var status = 400;
    globals.result = false;

    mail = await new Mail(to, cc, bcc, from, subject, text);
    response = await mail.sendMailHttp(status)
    assert.equal(response.status, status);
  });

  it('sce#... -- more test scenarios to add');
});

