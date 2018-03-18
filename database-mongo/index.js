var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nba');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});
// var itemSchema = mongoose.Schema({
var playerStatsSchema = mongoose.Schema({
  playerId:   Number,
  season:     String,
  rank:       Number,
  player:     String,
  team:       String,
  points:     Number,
  assists:    Number,
  category:   String
});

// create 'model' class so you can construct 'documents'
// var Item = mongoose.model('Item', itemSchema);
var PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);

// save data to DB
// create a function that does the below tasks:
var createAndSaveDocuments = function(leaderObject) {
  console.log('Leader Object Cat: ', leaderObject.parameters.StatCategory);
  console.log('Leader Obj all Params: ', leaderObject.parameters);
  // - creates documents from model class for each player from api data array
  let playersArray = leaderObject.resultSet.rowSet;
  playersArray.forEach((player) => {

    let name = player.playerId;
    name = new PlayerStats({ 
      playerId:   player[0],
      season:     leaderObject.parameters.Season, // !!!!!!!! WILL NEED TO UPDATE VALUE!!!!!!
      rank:       player[1],
      player:     player[2],
      team:       player[3],
      points:     player[player.length - 2],
      assists:    player[player.length - 6],
      category:   leaderObject.parameters.StatCategory
    });
    
    // - stores each document to mongodb
    // PlayerStats.update({ playerId: player[0] }, name, { upsert: true }, (err, name) => {
    //   if (err) {
    //     return console.error(err);
    //   }
    //     console.log("Success");
    // });

    name.save(function (err, name) {
      if (err) {
        return console.error(err);
      }
    });
  });
};

// selects all objects from 'PlayerStats' model class
  // my theory is this returns the data as an array of player objects from the database
var selectAll = function(targetSeason, targetCategory, callback) {
  PlayerStats.find({season: targetSeason, category: targetCategory}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  }); //.limit(5);
};
module.exports.createAndSaveDocuments = createAndSaveDocuments;
module.exports.selectAll = selectAll;