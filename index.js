var hq, wait;

hq = require('hyperquest');
wait = require('event-stream').wait;

module.exports = function(url, cb) {
  var req = hq(url);
  req.on('response', function(r) {
    if (r.statusCode >= 400) {
      req.destroy();
      cb(new Error('Bad statusCode in response: '+ r.statusCode));
    }
  });
  req.pipe(wait(function(err, body) {
    var parsed;
    if (err) { return cb(err); }
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      return cb(new Error('Failed to parse response: '+ body));
    }
    return cb(null, parsed);
  }));
};
