Express Server
=====
This is an end-to-end (E2E) tested HTTP server written using Node and Express, with MongoDB, and tested with Mocha/Chai!

## Get Started
1. Fork and clone the repo.
1. Run `npm i` inside the directory to install all the necessary packages.
1. Make your own .env with the correct MongoDB URI and a port of your choice. Look at the `.env.example` file as a guide. You'll need a copy in the root directory and one in the `test` directory as well.
1. In a new terminal window, run your Mongo server and make sure the URI matches the one you added to your .env files.
1. Run `node server.js` to start the server.
1. Run `npm run test:watch` to run the tests and build the necessary collections in your MongoDB.
1. Navigate to `localhost:<yourPort>` to get started!

## API
### Paths:
* `/api/games` - response will be an array of game objects.
* `/api/games/:id` - response will be a game object with the corresponding id.
* Any other path will give a 404.

### Methods:
* `POST` - will post an object
* `GET` - will get an array of all objects
* `GET<id>` - will get an object
* `PUT<id>` - will update a specified object
* `DELETE<id>` - will delete a specified object