var chai = require("chai");
var fetch = require("node-fetch");
var globals = require("./globals");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

var method = Mail.prototype;

function Mail(to, cc, bcc, from, subject, text) {
  this.to = to;
  this.cc = cc;
  this.bcc = bcc;
  this.from = from;
  this.subject = subject;
  this.text = text;
  this.mail = this.generateSendModel();
  this.host = "http://localhost:8080";
  this.path = "/sendMail";
}

method.addEmail = function(email) {
  code = email.substring(0, 2) + Math.floor(Math.random() * 10000000);
  var emailEntry = {
    email: email,
    code: code
  };
  //console.log(emailEntry);
  return emailEntry;
};

method.generateSendModel = function() {
  _to = this.addEmail(this.to);
  _cc = this.addEmail(this.cc);
  _bcc = this.addEmail(this.bcc);
  return {
    to: [_to],
    cc: [_cc],
    bcc: [_bcc],
    from: this.from,
    subject: this.subject,
    text: this.text
  };
};

method.sendMail = async function(status) {
  globals.result = false;
  //console.log(JSON.stringify(this.mail));
  await fetch(this.host + this.path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: {"to":[{"email":"a@b.com","code":"a@7549210"}],"cc":[],"bcc":[],"from":"c@d.com","subject":"test","text":"this is a test email."}
      body: JSON.stringify(this.mail)
  })
  .then(function(response) {
    //console.log(response.status);
    if (response.status === status) {
      globals.result = true;
    } else {
      globals.result = false;
    }
    //return globals.result;
  })
  .catch(function(error) {
    console.log(error);
    globals.result = false;
    //return globals.result;
  });
};

method.sendMailHttp = async function(status) {
  const response = await chai
    .request(this.host)
    .post(this.path)
    .set("content-type", "application/json")
    .send(JSON.stringify(this.mail));

  if (response.status === status) {
    globals.result = true;
  } else {
    globals.result = false;
  }
  return response;
};

module.exports = Mail;

