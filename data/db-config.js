const knex = require('knex')
const knexfile = require('../knexfile')
// const environment = process.env.NODE_ENV || 'development'
const environment = 'development'
module.exports=knex(knexfile[environment])