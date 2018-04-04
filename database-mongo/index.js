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
  blocks:     Number,
  rebounds:   Number,
  efficiency: Number,
  category:   String,
  image:      String
});

// create 'model' class so you can construct 'documents'
// var Item = mongoose.model('Item', itemSchema);
var PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);

// save data to DB
// create a function that does the below tasks:
var createAndSaveDocuments = function(playersArray) {
  // console.log('Leader Object Cat: ', leaderObject.parameters.StatCategory);
  // console.log('Leader Obj all Params: ', leaderObject.parameters);
  // - creates documents from model class for each player from api data array
  // let playersArray = leaderObject.resultSet.rowSet;

  playersArray.forEach((player) => {

    let name = player.playerId;
    name = new PlayerStats(player);

    //   playerId:   player.playerId,
    //   season:     player.season, // !!!!!!!! WILL NEED TO UPDATE VALUE!!!!!!
    //   rank:       player.rank,
    //   player:     player.player,
    //   team:       player.team,
    //   points:     player.points,
    //   assists:    player.assists,
    //   blocks:     player.blocks,
    //   rebounds:   player.rebounds,
    //   efficiency: player.efficiency,
    //   category:   player.category
    
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

var test = function(targetSeason, targetCategory) {
  return PlayerStats.find({season: targetSeason, category: targetCategory}).count() > 0;
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