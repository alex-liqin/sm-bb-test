Decription:
* This is showcase example for testing remote server (black box test) with mocha + chai test framework based on Node.js. 

Requirements
* A server from "https://github.com/aa-neg/sm-test" served as the system under test.
* Follow instructions in README.md in the above package to launch the server.

Steps to follow:

1. checkout server
```
git clone https://github.com/aa-neg/sm-test.git
```

2.
```
Follow instructions in README.mk of sm-test
```

3. launch the server
```
gradle build && java -jar build/libs/siteminder-test-0.1.0.jar --mailgun.apiKey=<INSERT MAILGUN API KEY> --sendgrid.apiKey=<INSERT SENDGRID API KEY HERE>
```

4. checkout tester
```
git clone https://github.com/alex-liqin/sm-bb-test.git
```

5. install dependencies
```
npm install mocha chai --save-dev
npm install -g mocha
npm install chai-http --save-dev
npm install node-fetch
```

6. Launch the test
```
mocha --timeout 15000 ./automation/testcase/
```
