# NBA Stats Leaders
This is a full-stack app that allows a user to search which players lead in specific NBA statistical categories.

![alt text](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/react-client/dist/assets/nba_home_062118.jpg)

### About
This site was built with React-bootstrap. It uses Node.js with an Express framework for convenient route handling. In addition it uses Axios for RESTful API calls and mongo for its database.

When a search is made, the mongo database is checked for the statistics data. If the data is not available in the database a get request is made to an NBA stats API. The statistical data is retrieved from the API, immediately displayed on the site, and then stored in the database for future searches.

### Tech Stack:
* Node.JS
* Express
* React
* React-Bootstrap
* Mongo DB
* Axios
* NBA Stats API
* Bing image scraper

### API Calls:
[github.com/jevans321/NBA-Stats-Leaders/blob/master/server/index.js
](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/server/index.js)

### Database Queries:
[github.com/jevans321/NBA-Stats-Leaders/blob/master/database-mongo/index.js
](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/database-mongo/index.js)


### Search Results Below:
![alt text](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/react-client/dist/assets/nba_search_061418.jpg)


### Footer Below:
![alt text](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/react-client/dist/assets/nba_footer_061418.jpg)


### Mobile Below:
![alt text](https://github.com/jevans321/NBA-Stats-Leaders/blob/master/react-client/dist/assets/nba_home_mobile_062118.jpg)
