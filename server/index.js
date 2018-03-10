const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const data = require('../react-client/src/data/data');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var dbItems = require('../database-mysql');
var dbItems = require('../database-mongo');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// UNCOMMENT FOR REACT // WHAT DOES THIS DO ????!!!!!!
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// Non Working Fetch API Function
var fetchApiData = function(seasonParam, callback) {
  let options = {
    url: 'https://stats.nba.com/stats/leagueleaders/?LeagueID=00&PerMode=PerGame&StatCategory=PTS&Season=' + seasonParam + '&SeasonType=Regular%20Season&Scope=S',
    headers: {
      'User-Agent': ('Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'),
      'Accept-Encoding': '*',
      'Accept-Language': ('en'),
      'origin': ('http://stats.nba.com')
    }
  };
  console.log('Options Object:......', options);
  request.get(options, (error, response, body) => {

    //console.log("Body:........", body);
    if (error) {
      return callback(error);
    }
    //console.log('Body from request.get:......', JSON.parse(body));
    callback(null, JSON.parse(body)); 
    //console.log('GET API body:.............', JSON.parse(body));
    //dbItems.createAndSaveDocuments(daJSON.parse(body)ta);
    
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // log all of the users repos
  });
};

// 'POST Request Handler' to '/player-data' endpoint
  // - adds data to database
  // - possibly populates the View with data
app.post('/player-data', (req, res) => {
  let season = req.body.season;
  //console.log('Player Data:....', data['playerData' + season].resource);
  //dbItems.createAndSaveDocuments(data['playerData' + season]);

  // console.log('Season Variable:..........', season);
  fetchApiData(season, (err, body) => {
    if(err) {
      console.log(err);
    } else {
      dbItems.createAndSaveDocuments(body);
    }
  });
});

// 'GET Request Handler' to '/player-data'' endpoint this middlewear? is retrieving database data
app.get('/player-data', (req, res) => {
  dbItems.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

  // NPM 'REQUEST' GET FUNCTION
  // let options = {
  //   url: 'http://stats.nba.com/stats/leagueleaders/?LeagueID=00&PerMode=PerGame&StatCategory=PTS&Season=' + season + '&SeasonType=Regular%20Season&Scope=S',
  //   headers: {
  //     'User-Agent': 'request',
  //     // 'Authorization': `token ${config.TOKEN}`
  //   }
  // };

  // request.get(options, function (error, response, body) {

  //   if (error) {
  //     return callback(error);
  //   }
  //   callback(null, JSON.parse(body)); 
  //   //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   //console.log('body:', body); // log all of the users repos
  // });
