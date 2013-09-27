var hq, wait;

hq = require('hyperquest');
wait = require('event-stream').wait;

module.exports = function(url, cb) {
  return (hq(url)).pipe(wait(function(err, body) {
    var parsed;
    if (err) {
      return cb(err);
    }
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      return cb(err);
    }
    return cb(null, parsed);
  }));
};