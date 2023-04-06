const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbWeatherCollection;
let dbStudentCollection;
let mongoDB_ref;

function connectToServer(callback) {
    client.connect(function (err, mongoDB) {
      if (err || !mongoDB) {
        return callback(err);
      }

      mongoDB_ref = mongoDB;

      dbWeatherCollection = mongoDB.db("sample_weatherdata");

      console.log("Successfully connected to MongoDB.");
      console.log(dbWeatherCollection);
      return callback();
    });
}

function getWeatherDB() {
    dbWeatherCollection = mongoDB_ref.db("sample_weatherdata");
    console.log(dbWeatherCollection);
    return dbWeatherCollection;
}

function getJamieDB() {
    dbStudentCollection = mongoDB_ref.db("jamie_db");
    console.log(dbStudentCollection);
    return dbStudentCollection;
}

function getWeatherData(request, response) {
// to pull query prams off the URL use something like:
//    const id = parseInt(request.query.id)
//    const name = request.query.name

        const weatherDB = getWeatherDB();

        weatherDB
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

    function getStudentData(request, response) {
    // to pull query prams off the URL use something like:
    //    const id = parseInt(request.query.id)
    //    const name = request.query.name

            const jamieDB = getJamieDB();

            jamieDB
              .collection("students")
              .find({}).limit(1000)
              .toArray(function (err, result) {
                if (err) {
                  response.status(400).send("Error fetching items from students collection!");
               } else {
                  response.json(result);
                }
              });
        }

module.exports = {
    connectToServer,
    getWeatherDB,
    getWeatherData,
    getStudentData
 };