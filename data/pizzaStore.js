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

async function connect() {
  console.log('Start connection attempt');
  auth = await pgClient.authenticate();
  console.log(auth)
  pgClient.authenticate().then(data => console.log(data)).catch(error => console.log(error))
  /*try {
    console.log('Start connection attempt');
    await pgClient.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }*/
}

connect()

/*
Pizza.sync().then(function(){
  console.log('DB connection sucessful.');
}, function(err){
  // catch error here
  console.log(err);

});
*/

/*
Pizza.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/

/*Pizza.sync().then(() => {
  console.log('postgres connection ready')
})
*/
module.exports = Pizza
