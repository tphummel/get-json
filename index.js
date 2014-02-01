var hq, wait;

hq = require('hyperquest');
wait = require('event-stream').wait;

module.exports = function(url, cb) {
  var req = hq(url);
  var statusError;

  req.on('response', function(r) {
    if (r.statusCode >= 400) {
      var err = new Error('Bad statusCode in response: '+ r.statusCode)
      err.statusCode = r.statusCode
      statusError = err
    }
  });
  
  req.pipe(wait(function(err, body) {
    console.log('err, body', err, body);
    var parsed;
    if (err) { return cb(err); }
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      return cb(new Error('Failed to parse response: '+ body));
    }
    return cb(statusError, parsed);
  }));
};
