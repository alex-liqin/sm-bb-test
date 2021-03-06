/*
 * This test case showcase each 'it()' contain test scenario, which contain a few tests (send-email-event) and these tests are generated by the same code.
 * Main.sendMail() with node-fetch utility for remote test is used.
 */

var fetch = require("node-fetch");
var Mail = require("../utility/mail.js");
var globals = require("../utility/globals.js");
var chai = require('chai');
var assert = chai.assert;

describe(__filename.split(__dirname+"/").pop(), function() {
  async function randomString(num) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < num; i++)
      text += await possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const LOOP = 100;

  for (var i=0; i<LOOP; i++) {
    it('sce#1 -- random valid email address (to, cc, bcc, from)' + ' #'+ i.toString(), async () => {
      to = "myname" + await randomString(Math.random() % 15) + "@mydomain.com";
      cc = "mycc" + await randomString(Math.random() % 15) + "@mydomain.com";
      bcc = "mybcc" + await randomString(Math.random() % 15) + "@mydomain.com";
      from = "myfrom" + await randomString(Math.random() % 15) + "@mydomain.com";
      subject = "my test mail subject" + await randomString(Math.random() % 100);
      text = "this is a test email." + await randomString(Math.random() % 10000);
      status = 200;
      mail = await new Mail(to, cc, bcc, from, subject, text);

      globals.result = false;
      await mail.sendMail(status)
      assert.equal(globals.result, true)
    });
  }

  for (var i=0; i<LOOP; i++) {
    it('sce#2 -- random empty email item (to, from, subject, text)' + ' #' + i.toString(), async () => {
      to = "myname" + await randomString(Math.random() % 15) + "@mydomain.com";
      cc = "mycc" + await randomString(Math.random() % 15) + "@mydomain.com";
      bcc = "mybcc" + await randomString(Math.random() % 15) + "@mydomain.com";
      from = "myfrom" + await randomString(Math.random() % 15) + "@mydomain.com";
      subject = "my test mail subject" + await randomString(Math.random() % 100);
      text = "this is a test email." + await randomString(Math.random() % 10000);
      status = 400;

      async function randomEmpty(item) {
        return (Math.random() % 2) === 0 ? "" : item;
      }
      to = await randomEmpty(to);
      cc = await randomEmpty(cc);
      bcc = await randomEmpty(bcc);
      from = await randomEmpty(from);
      subject = await randomEmpty(subject);
      text = await randomEmpty(text);

      switch (Math.random() % 4) {
        case 0: to = ""; break;
        case 1: from = ""; break;
        case 2: subject = ""; break;
        case 3: text = ""; break;
        default: to = "";
      }
      mail = await new Mail(to, cc, bcc, from, subject, text);

      globals.result = false;
      await mail.sendMail(status)
      assert.equal(globals.result, true)
    });
  }

  it('sce#... -- more test scenarios to add');
});

