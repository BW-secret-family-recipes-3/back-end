const db = require('../data/db-config')

function findBy(filter) {
  return db('users').where(filter)
}

async function recipesByUser(id) {
  const recipes = await db('recipes').where({ user_id: id })
  const instructions = await db.select('*').from('instructions')
      .join('recipes', 'recipe_id', 'recipes.id');
  let newArray = [];
  recipes.forEach(recipe => {
    let instructionsArray = instructions.filter(item => item.recipe_id === recipe.id)
    newArray.push({recipe, instructionsArray})
  })
  return newArray
}

// BOILERPLATE
function find(table) {
  return db(table) 
}
function add(addedObject, table) { 
  return( 
    db(table) 
    .insert(addedObject) 
    .then( id => {
      return findById(id[0], table)
    })
  )
}
function findById(id, table) {
  return db(table).where({ id }).first() 
}
function update(changes, id, table) {
  return db(table) 
  .update(changes)
  .where({ id })
  .then( () => {
      return findById(id, table)
  })
}
function remove(id, table) {
  let removed
  findById(id, table).then(rez => removed=rez)
  return db(table) 
    .where({ id })
    .del()
    .then(() => {
      return removed
    })
}
module.exports ={
  find,
  findById,
  add,
  update,
  remove,
  findBy,
  recipesByUser
}