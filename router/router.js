const router = require('express').Router()
const helper= require('./helper') 

// GET LOGGED IN USER
router.get('/user', (req, res) => {
  const {username} = req.jwt
  helper.findBy({username})
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// GET ALL RECIPES/INSTRUCTIONS/INGREDIENTS FOR LOGGED IN USER
router.get('/:id/recipes', (req, res) => {
  const id = req.params.id
  helper.recipesByUser(id)
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// ADD A NEW RECIPE
router.post('/recipes', (req, res) => {
  const { user_id, title } = req.body
  
  if (user_id && title) {
    helper.add(req.body)
    .then(rez => {res.status(200).json(rez)})
    .catch(err => res.status(500).json({status: 500, err}))
  } else {
    res.status(401).json({message: 'Must have a title and user_id'})
  }
})

// EDIT A RECIPE
router.put('/recipes/:id', (req, res) => {
  const id = Number(req.params.id)
  helper.update(req.body, id)
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

// DELETE A RECIPE AND ASSOCIATED INGREDIENTS AND INSTRUCTIONS
router.delete('/recipes/:id', (req, res) => {
  const id = Number(req.params.id)
  helper.remove(id)
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})



module.exports = router