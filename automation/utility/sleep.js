function Sleep(mseconds) {
  var waitTill = new Date(new Date().getTime() + mseconds);
  while(waitTill > new Date()){}
}

module.exports = Sleep;

