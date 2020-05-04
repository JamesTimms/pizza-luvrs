const { filter, orderBy, values } = require('lodash')

const Pizza = require('../models/pizza')
const ImageStore = require('../lib/imageStore')
const PizzaStore = require('./pizzaStore')

async function create (name, toppings, img, username) {
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img)
  const pizza = new Pizza(name, toppings, imgUrl, username)
  console.log("Create")
  return PizzaStore.create(prepPizza(pizza))
}

// for mocks that don't need pizza images saved
function batchImport (name, toppings, imgUrl, username) {
  const pizza = new Pizza(name, toppings, imgUrl, username)
  PizzaStore.create(prepPizza(pizza))
  console.log(PizzaStore.pgClient)
  console.log("Imported")
}

async function getForUser (username) {
  console.log("get for user")
  return PizzaStore.findAll({
    where: {
      username: username
    },
    raw: true
  }).then(debriefPizzas)
}

async function getRecent () {
  console.log("get recent")
  return PizzaStore.findAll({
    order: [['created', 'DESC']],
    limit: 4,
    raw: true
  }).then(debriefPizzas)
}

async function get (pizzaId) {
  console.log("get by id")
  return PizzaStore.findOne({
    where: {
      id: pizzaId
    },
    raw: true
  }).then(debriefPizza)
}

function prepPizza (pizza) {
  console.log("pre pizza")
  return {
    ...pizza,
    toppings: JSON.stringify(pizza.toppings)
  }
}

function debriefPizza (Pizza) {
  console.log("debrief pizza")
  return {
    ...pizza,
    toppings: JSON.parse(pizza.toppings)
  }
}

function debriefPizzas (pizzas) {
  console.log("debrief pizzas")
  return pizzas.map(debriefPizza)
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent
}
