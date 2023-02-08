const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jamie_demo',
  password: 'Keyin2021',
  port: 5433,
})

const getStudents = (request, response) => {
  pool.query('SELECT * FROM student ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getStudents,
}

