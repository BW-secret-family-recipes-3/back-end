const { where } = require('../data/db-config');
const db = require('../data/db-config')

function findBy(filter) {
  return db('users').where(filter)
}

async function recipesByUser(id) {
  const recipes = await db('recipes').where({ user_id: id })
  const instructions = await db('instructions')
      .where({ user_id: id })
      .select('instructions.step_number', 'instructions.step_description', 'recipe_id')
      .orderBy('step_number');
  const ingredients = await db('recipe_ingredients')
    .join('recipes', 'recipes.id', 'recipe_ingredients.recipe_id')
    .where({ user_id: id })
    .select('recipe_ingredients.name', 'recipe_ingredients.measurement', 'recipe_ingredients.recipe_id')

  let newArray = [];
  recipes.forEach(recipe => {
    let instructionsArray = instructions.filter(item => item.recipe_id === recipe.id);
    let ingredientsArray = ingredients.filter(item => item.recipe_id === recipe.id)
    newArray.push({recipe, instructions: instructionsArray, ingredients: ingredientsArray})
  })
  return newArray
}

async function add(addedObject) { 
  const { title, user_id, instructions, ingredients} = addedObject
  const id = await db('recipes').insert({title, user_id})
  
  instructions.forEach(async item => {
   await db('instructions').insert({...item, recipe_id: id[0]})
  }) 
  ingredients.forEach(async item => {
    await db("recipe_ingredients").insert({...item, recipe_id: id[0]})
  })

  return "you did the thing"
}

// update recipes
async function update(changes, id) {
  const { title, instructions, ingredients } = changes
  
  if (title) {
     db('recipes')
    .where("id", "=", id).update("title", title)
  }
  
  if (instructions) {
   await db('instructions').where("recipe_id", "=", id).del()
   
    instructions.forEach(async item => {
      await db('instructions').insert({...item, recipe_id: id})
    })
  } 

  if (ingredients) {
   await db('recipe_ingredients').where("recipe_id", "=", id).del()

    ingredients.forEach(async item => {
      await db("recipe_ingredients").insert({...item, recipe_id: id})
    })
  }
  return 'Successfully updated Recipe'
  
}
// BOILERPLATE
function find(table) {
  return db(table) 
}

function findById(id, table) {
  return db(table).where({ id }).first() 
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