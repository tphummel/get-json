var assert = require("assert");
var http = require("http");
var through = require("event-stream").through;

var GetJson = require("../index");

var port = 3002
  , url  = 'http://localhost:'+ port;

function createServer(resp, cb) {
  var server = http.createServer(function (req, res) {
    if(req.method !== "GET"){
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

  it("should return original body on err", function(done) {
    var resp = 'whoops';
    createServer(resp, function(server) {
      GetJson(url, function(err, res) {
        assert(err instanceof Error, "error on invalid json");
        assert(res === resp, "method should return original body");
        server.close()
        done();
      });
    });
  });
});
