# First Express Server

## Project Description
An Express server with a single resource using MongoDb as the database.

## Developer
Requires:
* Node v10 or later.
* MongoDB

### How to get started
* Fork repository, clone locally, navigate to repository directory,
* Download all the files with `npm i`,
* To test, run `npm test`. 

### How to use API
* Connect to server with `npm run start`.
* Enter `http://localhost:3000` in your browser.
* This API saves a single resource to MongoDB: Games. To the data, click the link provided on the splash page.

The following methods are used for the paths listed:

Method | Path
---|---
`GET` |     `/<resources>`
`GET` |     `/<resources>/:id`
`POST` |    `/<resources>`
`PUT` |     `/<resources>/:id`
`DELETE` |  `/<resources>/:id`

## Contributor
[Mariah Adams](https://github.com/MariahAdams)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgment 
Forked from [alchemy-fullstack-js-summer-2018/first-express-server](https://github.com/alchemy-fullstack-js-summer-2018/first-express-server)