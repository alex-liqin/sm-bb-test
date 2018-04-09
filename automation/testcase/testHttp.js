"use strict";
var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe(__filename.split(__dirname+"/").pop(), function() {
  //var host = "http://" + process.env.IP + ':' + process.env.PORT;
  var host = "http://localhost:8080";
  var path = "/sendMail";
  var mail = {
    to: [ { email: 'myname@mydomain.com', code: 'my5017472' } ],
    cc: [ { email: 'mycc@mydomain.com', code: 'my7022683' } ],
    bcc: [ { email: 'mybcc@mydomain.com', code: 'my420032' } ],
    from: 'myfrom@mydomain.com',
    subject: 'my test mail subject',
    text: 'this is a test email.' };

  it('this is a showcase to verify detailed http response returned', async () => {
    const response = await chai
      .request(host)
      .post(path)
      .set("content-type", "application/json")
      .send(JSON.stringify(mail))
      //.end(function(err, res) {
      //  if (err) throw err;
      //});

      expect(response).to.be.json
      expect(response).to.have.status(200)
      // TODO: more field validation code added here
      //console.log(response)
      assert.equal(response.status, 200)
  });
});

