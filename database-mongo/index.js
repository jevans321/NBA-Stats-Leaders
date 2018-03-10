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
var pointsLeaderSchema = mongoose.Schema({
  playerId:   Number,
  season:     String,
  rank:       Number,
  player:     String,
  team:       String,
  points:     Number
});

// create 'model' class so you can construct 'documents'
// var Item = mongoose.model('Item', itemSchema);
var PointsLeader = mongoose.model('PointsLeader', pointsLeaderSchema);

// save data to DB
// create a function that does the below tasks:
var createAndSaveDocuments = function(leaderObject) {
  // - creates documents from model class for each player from api data array
  let playersArray = leaderObject.resultSet.rowSet;
  playersArray.forEach((player) => {

    let name = player.playerId;
    name = new PointsLeader({ 
      playerId:   player[0],
      season:     leaderObject.parameters.Season, // !!!!!!!! WILL NEED TO UPDATE VALUE!!!!!!
      rank:       player[1],
      player:     player[2],
      team:       player[3],
      points:     player[player.length - 2]
    });
    
    // - stores each document to mongodb
    // PointsLeader.update({ playerId: player[0] }, name, { upsert: true }, (err, name) => {
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

// selects all objects from 'PointsLeader' model class
  // my theory is this returns the data as an array of player objects from the database
var selectAll = function(callback) {
  PointsLeader.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  }); //.limit(5);
};
module.exports.createAndSaveDocuments = createAndSaveDocuments;
module.exports.selectAll = selectAll;