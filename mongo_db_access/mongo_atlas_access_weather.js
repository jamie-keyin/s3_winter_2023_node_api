const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbWeatherCollection;

function connectToServer(callback) {
    client.connect(function (err, mongoDB) {
      if (err || !mongoDB) {
        return callback(err);
      }

      dbWeatherCollection = mongoDB.db("sample_weatherdata");

      console.log("Successfully connected to MongoDB.");
      console.log(dbWeatherCollection);
      return callback();
    });
}

function getWeatherCollection() {
    console.log(dbWeatherCollection);
    return dbWeatherCollection;
}

function getWeatherData(request, response) {
// to pull query prams off the URL use something like:
//    const id = parseInt(request.query.id)
//    const name = request.query.name

        const weatherCollectionDB = getWeatherCollection();

        weatherCollectionDB
          .collection("data")
          .find({}).limit(10)
          .toArray(function (err, result) {
            if (err) {
              response.status(400).send("Error fetching items from weather collection!");
           } else {
              response.json(result);
            }
          });
    }

module.exports = {
    connectToServer,
    getWeatherCollection,
    getWeatherData,
 };