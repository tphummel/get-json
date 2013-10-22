# get-json

wrapper for posting json with hyperquest

[![Build Status](https://travis-ci.org/tphummel/get-json.png)](https://travis-ci.org/tphummel/get-json)  
[![NPM](https://nodei.co/npm/get-json-hq.png?downloads=true)](https://nodei.co/npm/get-json-hq/)

## install

    npm install get-json-hq

## test
    
    ./bin/test

## example
    
    getJson = require("get-json-hq")

    getJson("http://localhost:3002", function(err, res) {
      // do stuff
    }