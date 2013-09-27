var assert = require("assert");
var http = require("http");
var through = require("event-stream").through;

var GetJson = require("../index");

describe("get-json tests", function(){
  it("should get json from server", function(done){

    var server = http.createServer(function (req, res) {
      if(req.method == "GET"){
        var payload = {test: "fun times"};
        res.write(JSON.stringify(payload));
        res.end();

      }else{
        res.statusCode = 404;
        res.end();
      }
    });

    server.listen(3002, function(){
      GetJson("http://localhost:3002", function(err, res) {
        var expected = JSON.stringify({test:"fun times"});
        assert(JSON.stringify(res) == expected, "response from server should match expected json");
        server.close()
        done(err);
      });
    });
  });
});