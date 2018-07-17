const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;

const promise = MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });

const dbPromise = promise.then(client => {
    console.log('MongoDB connected at', MONGODB_URI);
    dbPromise.client = client;
    return client.db();
});

module.exports = dbPromise;