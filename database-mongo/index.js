var mongoose = require('mongoose');

var uri = 'mongodb://heroku_f60d9n6j:plmb510fjst71ucoktnot4cm1p@ds113606.mlab.com:13606/heroku_f60d9n6j';

var options = {
  "server" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  },
  "replset" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  }
}
mongoose.connect(uri, options);

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

// function that saves data from API to database
var createAndSaveDocuments = function(playersArray) {

  playersArray.forEach((player) => {

    // create new Object for database from 'player' Object
    name = new PlayerStats(player);

    // save new Object to database
    name.save(function (err, name) {
      if (err) {
        return console.error(err);
      }
    });
  });
};

// selects all objects from 'PlayerStats' model class
// function that returns selected data from database as an array of player objects
var selectAll = function(targetSeason, targetCategory, callback) {
  PlayerStats.find({season: targetSeason, category: targetCategory}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
module.exports.createAndSaveDocuments = createAndSaveDocuments;
module.exports.selectAll = selectAll;