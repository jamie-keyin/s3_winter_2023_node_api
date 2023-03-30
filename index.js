require('dotenv').config({ path: './config.env' });

const express = require('express')
const bodyParser = require('body-parser')
const restAPP = express()
const pgDBAccessLayer = require('./pg_data_access/pg_db_access')
const mongoWeatherDBAccessLayer = require('./mongo_db_access/mongo_atlas_access_weather')
const port = 3000

restAPP.use(bodyParser.json())
restAPP.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

restAPP.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

restAPP.get('/students', pgDBAccessLayer.getStudents)
restAPP.post('/student', pgDBAccessLayer.createStudent)
restAPP.put('/student/:id', pgDBAccessLayer.updateStudent)
restAPP.delete('/student/:id', pgDBAccessLayer.deleteStudent)

restAPP.get('/weather', mongoWeatherDBAccessLayer.getWeatherData)

// perform a database connection when the server starts
mongoWeatherDBAccessLayer.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }

    // start the Express server
    restAPP.listen(port, () => {
      console.log(`App running on port ${port}.`)
    })
});