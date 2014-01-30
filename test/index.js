var assert = require("assert");
var http = require("http");
var through = require("event-stream").through;

var GetJson = require("../index");

var port = 3002
  , url  = 'http://localhost:'+ port;

function createServer(resp, cb) {
  var server = http.createServer(function (req, res) {
    if(req.method !== "GET" || resp == null){
      res.statusCode = 404;
    } else {
      res.write(resp);
    }
    res.end();
  });
  server.listen(port, function() { cb(server); });
}

describe("get-json tests", function(){
  it("should get json from server", function(done){
    var resp = JSON.stringify({ test: 'fun times' })
    createServer(resp, function(server) {
      GetJson(url, function(err, res) {
        assert(JSON.stringify(res) === resp, "response from server should match expected json");
        server.close()
        done(err);
      });
    });
  });

  it("should return friendly JSON.parse errors", function(done) {
    var resp = 'whoops'
      , expected = 'Failed to parse response: '+ resp;
    createServer(resp, function(server) {
      GetJson(url, function(err) {
        assert(err instanceof Error, "error on invalid json");
        assert.equal(err.message, expected, "method should return original body");
        server.close()
        done();
      });
    });
  });

  it("should treat invalid statusCodes as errors", function(done) {
    var expected = 'Bad statusCode in response: '+ 404;
    createServer(null, function(server) {
      GetJson(url, function(err) {
        assert(err instanceof Error, "error on invalid json");
        assert.equal(err.message, expected, "method should return original body");
        server.close()
        done();
      });
    });
  });
});
