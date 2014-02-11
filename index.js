var hq, wait;

hq = require('hyperquest');
wait = require('event-stream').wait;

module.exports = function(url, cb) {
  if (url.match(/^\//)) {
    var protocol = window.location.protocol
    var host = window.location.host
    url = protocol + '//' + window.location.host + url
  }
  
  var req = hq(url);
  var statusError;

  req.on('response', function(r) {
    if (r.statusCode >= 400) {
      var err = new Error('Bad statusCode in response: '+ r.statusCode);
      err.statusCode = r.statusCode;
      statusError = err;
    }
  });
  
  req.pipe(wait(function(err, body) {
    var parsed;
    if (err) return cb(err);
    if (statusError) return cb(statusError);
    
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      return cb(new Error('Failed to parse response: '+ body));
    }
    return cb(statusError, parsed);
  }));
};
