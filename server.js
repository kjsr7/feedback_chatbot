'use strict';
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://project:project1@ds239873.mlab.com:39873/customer_feedback";

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const hostname = '127.0.0.1';

const app = express()
app.use(bodyParser.json())
app.post('/', function (req, res) {
/* let{
      status,
      result
  } = req.body;*/
//console.log(req.body);
if(req.body.result.action  === 'get_rating'){
let rating = req.body.result.parameters["rating"];
//
	MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("customer_feedback");
        var myobj = {name: "kjsr", address: "Silicon Valley",rate: rating };
        dbo.collection("customers").insertOne(myobj, function(err,res) {
                // mongo db creates the uncreated collection automatically
                if(err)
                        throw err;
                console.log("1 document inserted");
                db.close();
        });
        });
//
/*var webhookReply = "hello "+rating;
  res.json({
    speech: webhookReply,
    displayText: webhookReply,
    source: 'webhook'
  });*/

}
if(req.body.result.action === 'retrieve_rating.retrieve_rating-custom')
{
let answer = req.body.result.resolvedQuery;

console.log(answer);
}

if(req.body.result.action === 'retrieve_rating.retrieve_rating-custom.retrieve_rating-custom-fallback')
{
console.log(req.body);
console.log(req.body.result.fulfillment.speech);
var comm = req.body.result.resolvedQuery;
var ans = req.body.result.fulfillment.speech;
ans = ans.split(" ");
console.log(ans[0]);
var rat = ans[0];
console.log(ans[1]);
var yesorno = ans[1];
 MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("customer_feedback");
        var myobj = {rating: rat, yes: yesorno, comments: comm};
        dbo.collection("customers").insertOne(myobj, function(err,res) {
                // mongo db creates the uncreated collection automatically
                if(err)
                        throw err;
                console.log("1 document inserted");
                db.close();
        });
        });
var webhookReply = "Thank you for providing the feedback";
  res.json({
    speech: webhookReply,
    displayText: webhookReply,
    source: 'webhook'
  });

}
});
app.listen(3000, hostname  => console.log('[BotEngine] Webhook is listening'));
