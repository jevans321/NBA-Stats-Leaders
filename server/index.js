const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const data = require('../react-client/src/data/data');
var dbItems = require('../database-mongo');
var Scraper = require ('images-scraper')
  , bing = new Scraper.Bing();

// google.list({
// 	keyword: 'russel westbrook',
// 	num: 1,
// 	detail: true,
// 	nightmare: {
// 		show: false
// 	}
// })
// .then(function (res) {
// 	console.log('first result from google', res);
// }).catch(function(err) {
// 	console.log('err', err);
// });

//const GoogleImages = require('google-images');

// const client = new GoogleImages('013123080131467633086:8s2btvvpgbq', 'AIzaSyDmzv1XHCZgara3-xMtmgTAM_guU7ihZ-Y');
// client.search('Steve Angello')
//     .then(images => {
//       console.log('GoogleImages: ', images);
//         /*
//         [{
//             "url": "http://steveangello.com/boss.jpg",
//             "type": "image/jpeg",
//             "width": 1024,
//             "height": 768,
//             "size": 102451,
//             "thumbnail": {
//                 "url": "http://steveangello.com/thumbnail.jpg",
//                 "width": 512,
//                 "height": 512
//             }
//         }]
//          */
//     })
//     .catch(function (error) {
//       console.log('GoogleImages Error: ', error);
//     });

// gis('cats', logResults);

// function logResults(error, results) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     console.log('Gis Image Array: ', JSON.stringify(results, null, '  '));
//   }
// }

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

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
  //console.log('Options Object:......', options);
  request.get(options, (error, response, body) => {

    //console.log("Body:........", body);
    if (error) {
      return callback(error);
    }
    // console.log('Body from request.get:......', JSON.parse(body));
    callback(null, JSON.parse(body)); 
    //console.log('GET API body:.............', JSON.parse(body));
    //dbItems.createAndSaveDocuments(daJSON.parse(body)ta);
  });
};

// 'POST Request Handler' to '/player-data' endpoint
  // - adds data to database
  // - possibly populates the View with data
app.post('/player-data', (req, res) => {
  let season = req.body.season;
  let category = req.body.category;
  //console.log('Player Data:....', data['playerData' + season].resource);
  //dbItems.createAndSaveDocuments(data['playerData' + season]);

  // console.log('Season Variable:..........', season);
  fetchApiData(season, category, (err, body) => {
    if(err) {
      console.log(err);
    } else {
      //console.log('fetchAPIData body: ', body);


      let rankArray = [];
      let playersApiArray = body.resultSet.rowSet;
      // for (var i = 0; i < playersApiArray.length; i++) {

      //   let player = playersApiArray[i];

      //   let playerObjfromApi = {
      //     playerId:   player[0],
      //     season:     season,
      //     rank:       player[1],
      //     player:     player[2],
      //     team:       player[3],
      //     points:     player[player.length - 2],
      //     assists:    player[player.length - 6],
      //     blocks:     player[player.length - 4],
      //     rebounds:   player[player.length - 7],
      //     efficiency: player[player.length - 1],
      //     category:   category
      //   }
      //   rankArray.push(playerObjfromApi);
     
      //   if (rankArray.length > 50) {
      //     break;
      //   }
      // }
      // dbItems.createAndSaveDocuments(body);
      // res.send(rankArray);






      // // // --------------  1  ----------------
      var promise1 = new Promise(function(resolve, reject) {
        
        for (var i = 0; i < playersApiArray.length; i++) {

          let player = playersApiArray[i];
          // get player image from Google Images 
          //console.log('Player Name index 2: ', player[2]);


          bing.list({
            keyword: "nba " + player[2],
            num: 1,
            detail: true
          })
          .then(function (res) {
            //console.log('Bing Image resp: ', res[0].thumb); // res[0].thumb_url
 
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
            //console.log('Inside Google Img Func - Rank Array: ', rankArray);
            //rankArray[playerObjfromApi.rank] = playerObjfromApi;

            // --------------  3  ----------------
            //let obj = response.data[i];
            //rankArray[playerObjfromApi.rank - 1] = playerObjfromApi;
            rankArray.push(playerObjfromApi);
            //resolve(rankArray);
            if (rankArray.length >= playersApiArray.length) {
              rankArray.sort((a, b) => a.rank - b.rank);
              resolve(rankArray.slice(0, 50));
            }
            //console.log('Rank Array: ', rankArray);
          }).catch(function(err) {
            console.log('err', err);
          });
          



        }
        //console.log('Inside Promise before Resolve rankArray: ', rankArray);
        
      });
      promise1.then(function(value) {
        // console.log('In Promise - Resolved value: ', value);
        res.send(value);
        dbItems.createAndSaveDocuments(value);
        // expected output: "Success!"
      });

      // // --------------  4  ----------------
      
    }
  });
});

// 'GET Request Handler' to '/player-data'' endpoint this middlewear? is retrieving database data
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
