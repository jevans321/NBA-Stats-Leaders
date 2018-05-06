const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const data = require('../react-client/src/data/data');
const dbItems = require('../database-mongo');
const Scraper = require ('images-scraper')
  , bing = new Scraper.Bing();


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

// function that retrieves data from NBA API
var fetchApiData = function(targetSeason, targetCategory, callback) {
  let options = {
    url: 'https://stats.nba.com/stats/leagueleaders/?LeagueID=00&PerMode=PerGame&StatCategory=' + targetCategory + '&Season=' + targetSeason + '&SeasonType=Regular%20Season&Scope=S',
    headers: {
      'User-Agent': ('Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'),
      'Accept-Encoding': '*',
      'Accept-Language': ('en'),
      'origin': ('http://stats.nba.com')
    }
  };

  request.get(options, (error, response, body) => {
    if (error) {
      return callback(error);
    }
    callback(null, JSON.parse(body)); 
  });
};

// 'POST Request Handler' to '/player-data' endpoint
  // - retrieves data from NBA API
  // - adds data to database
  // - sends data to the View
app.post('/player-data', (req, res) => {
  let season = req.body.season;
  let category = req.body.category;

  fetchApiData(season, category, (err, body) => {
    if(err) {
      console.log(err);
    } else {

      let rankArray = [];
      let playersApiArray = body.resultSet.rowSet;

      var promise1 = new Promise(function(resolve, reject) {
        
        for (var i = 0; i < playersApiArray.length; i++) {
          
          let player = playersApiArray[i];

          // get player image from Bing Images 
          bing.list({
            keyword: "nba " + player[2],
            num: 1,
            detail: true
          })
          .then(function (res) {

            let playerObjfromApi = {
              playerId:   player[0],
              season:     season,
              rank:       player[1],
              player:     player[2],
              team:       player[3],
              points:     player[player.length - 2],
              assists:    player[player.length - 6],
              blocks:     player[player.length - 4],
              rebounds:   player[player.length - 7],
              efficiency: player[player.length - 1],
              category:   category,
              image:      res[0].thumb
            }

            if(playerObjfromApi.rank < 51) {
              rankArray.push(playerObjfromApi);
            }
            if(rankArray.length >= 50) {
              rankArray.sort((a, b) => a.rank - b.rank);
              resolve(rankArray);
            }
            
          }).catch(function(err) {
            console.log('err', err);
          });

        }
        
      });
      promise1.then(function(value) {
        res.send(value);
        dbItems.createAndSaveDocuments(value);
      });
      
    }
  });
});

// 'GET Request Handler' to '/player-data'' endpoint
app.get('/player-data', (req, res) => {
  console.log('Get Handler Request Query: ', req.query);

  dbItems.selectAll(req.query.season, req.query.category, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(5000, function() {
  console.log('listening on port 5000!');
});