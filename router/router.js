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

router.post('/', (req, res) => {
  helper.add(req.body, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  helper.update(req.body, id, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  helper.remove(id, 'TABLE')
  .then(rez => res.status(200).json(rez))
  .catch(err => res.status(500).json({status: 500, err}))
})

module.exports = router