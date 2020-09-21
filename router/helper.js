
const db = require('../data/db-config')

function findBy(filter) {
  return db('users').where(filter)
}

// ADD USER
async function addUser(user, table) {
  await db(table).insert(user);
  return db('users').where({ username: user.username })
}

// GET ALL RECIPES/INSTRUCTIONS/INGREDIENTS FOR LOGGED IN USER
async function recipesByUser(id) {
  const recipes = await db('recipes')
  .where({ user_id: id })
  
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

// ADD A NEW RECIPE
async function add(addedObject) { 
  const { title, category, source, user_id, instructions, ingredients} = addedObject
  const id = await db('recipes').insert({title, user_id, category, source})
  
  instructions.forEach(async item => {
   await db('instructions').insert({...item, recipe_id: id[0]})
  }) 
  ingredients.forEach(async item => {
    await db("recipe_ingredients").insert({...item, recipe_id: id[0]})
  })

  return "Recipe added"
}

// EDIT A RECIPE
async function update(changes, id) {
  const { title, category, source, instructions, ingredients } = changes
   
  if (title) {
  await db('recipes')
    .where("id", "=", id).update("title", title)
  }

  if (category) {
  await db('recipes')
   .where("id", "=", id).update("category", category)
  }

  if (source) {
  await db('recipes')
  .where("id", "=", id).update("source", source)
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

  return 'Recipe updated'
}

// DELETE A RECIPE
async function remove(id) {
  await db('recipe_ingredients').where('recipe_id', '=', id).del();
  await db('instructions').where('recipe_id', '=', id).del();
  await db('recipes').where({ id }).del();
 return 'Recipe terminated'
}

module.exports ={
  add,
  addUser,
  update,
  remove,
  findBy,
  recipesByUser
}