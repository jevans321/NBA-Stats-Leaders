
## Command Line Commands

### Start Server
Start Server
$ npm run react-dev
$ npm run server-dev

Kill Port if it won't stop running
$ sudo lsof -t -i tcp:3000 | xargs kill -9

### Mongo DB
Start
$ mongod
Verify that MongoDB has started successfully by checking the process output for the following line:
[initandlisten] waiting for connections on port 27017

Start Mongo Shell
$ mongo --host 127.0.0.1:27017







    
