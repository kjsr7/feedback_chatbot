'use strict';

const PORT = process.env.PORT || 3000;
var restify = require('restify');
var request = require('request');
var os = require('os');
 
const server = restify.createServer({
  name: 'railwaybot',
  version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.jsonp());
