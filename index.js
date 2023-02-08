const express = require('express')
const bodyParser = require('body-parser')
const restAPP = express()
const pgDBAccessLayer = require('./pg_data_access/pg_db_access')
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


// start the Express server
restAPP.listen(port, () => {
  console.log(`App running on port ${port}.`)
})