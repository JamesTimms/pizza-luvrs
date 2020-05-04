const Sequelize = require('sequelize')

const database = 'pizza_luvrs'
const endpoint = 'reebric-pizza-db-prod.cvenwu2qbvhl.eu-west-2.rds.amazonaws.com'
const username = 'postgres'
const password = 'password123'

const pgClient = new Sequelize(
  database,
  username,
  password,
  {
    host: endpoint,
    dialect: 'postgres',
    logging: console.log
  }
)

const Pizza = pgClient.define('pizza', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  toppings: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.BIGINT
  }

})

Pizza.sync().then(() => {
  console.log('postgres connection ready')
})

module.exports = Pizza
